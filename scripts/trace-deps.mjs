import fs from 'fs';
import path from 'path';

const antSrcDir = path.resolve('packages/ant');

// Direct ant-design-vue components/functions used by antx at RUNTIME
// (excluding types-only imports)
const seedModules = [
  'button',
  'input',
  'flex',
  'upload',
  'progress',
  'image',
  'typography',
  'config-provider',
  'theme',
];

// Build file index
const allFiles = new Map();
function collectFiles(dir, base) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (e.isFile() && /\.(ts|tsx|vue)$/.test(e.name)) {
      allFiles.set(rel.replace(/\\/g, '/'), full);
    } else if (e.isDirectory() && !['__tests__','demo','node_modules','style'].includes(e.name)) {
      collectFiles(full, base);
    }
  }
}

collectFiles(antSrcDir, antSrcDir);

const visited = new Set();
const needed = new Set();

function resolveImport(fromFile, importPath) {
  const fromDir = path.dirname(fromFile);
  const resolved = path.resolve(fromDir, importPath);
  const relResolved = path.relative(antSrcDir, resolved).replace(/\\/g, '/');
  
  if (allFiles.has(relResolved)) return allFiles.get(relResolved);
  
  for (const ext of ['.ts', '.tsx', '.vue']) {
    const withExt = relResolved + ext;
    if (allFiles.has(withExt)) return allFiles.get(withExt);
  }
  
  for (const idx of ['index.ts', 'index.tsx']) {
    const idxPath = relResolved + '/' + idx;
    if (allFiles.has(idxPath)) return allFiles.get(idxPath);
  }
  
  return null;
}

function extractRuntimeImports(content) {
  const results = [];
  
  // Remove type-only imports first
  // import type { X } from '...'
  // import { type X } from '...'
  
  // Match: import { X, type Y } from './xxx' - keep only runtime (non-type) imports
  // But for our purposes, if a file has a runtime import from a file, that file is needed
  
  // We'll just match all relative imports (excluding 'import type' lines)
  const lines = content.split('\n');
  for (const line of lines) {
    // Skip pure type imports
    if (/^\s*import\s+type\s/.test(line)) continue;
    
    // Match from './xxx' or from '../xxx'
    const m = line.match(/from\s+['"](\.[^'"]+)['"]/);
    if (m) {
      // Check if this specific import is type-only
      const before = line.substring(0, m.index);
      // If it's a named import like import { type X, Y } from
      // We still include it because other non-type things might be imported from the same file
      results.push(m[1]);
    }
    
    // Side-effect imports
    const sm = line.match(/import\s+['"](\.[^'"]+)['"]/);
    if (sm) {
      results.push(sm[1]);
    }
  }
  
  return results;
}

function traceFile(filePath) {
  if (visited.has(filePath)) return;
  visited.add(filePath);
  needed.add(filePath);
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const imports = extractRuntimeImports(content);
  
  for (const imp of imports) {
    const resolved = resolveImport(filePath, imp);
    if (resolved) {
      traceFile(resolved);
    }
  }
}

// Seed from module entry files only
for (const mod of seedModules) {
  let found = false;
  for (const entry of ['index.ts', 'index.tsx']) {
    const rel = mod + '/' + entry;
    if (allFiles.has(rel)) {
      traceFile(allFiles.get(rel));
      found = true;
      break;
    }
  }
  // For modules without index (like _util), don't seed - they'll be pulled in transitively
}

// Add deep imports from antx
const deepPaths = [
  '_util/EventInterface.ts',
  'config-provider/context.ts',
  'theme/interface',
  'theme/internal.ts',
  'theme/util/alias',
  '_util/cssinjs',
];

for (const dp of deepPaths) {
  const paths = [
    dp, dp + '.ts', dp + '.tsx',
    dp + '/index.ts', dp + '/index.tsx'
  ];
  for (const p of paths) {
    if (allFiles.has(p)) {
      traceFile(allFiles.get(p));
      break;
    }
  }
}

// Output
const dirs = new Set();
for (const f of needed) {
  const rel = path.relative(antSrcDir, f).replace(/\\/g, '/');
  const topDir = rel.split('/')[0];
  dirs.add(topDir);
}

console.log('Needed dirs (' + dirs.size + '):');
[...dirs].sort().forEach(d => console.log('  ' + d));
console.log('Total files needed:', needed.size);

const allDirs = new Set();
for (const f of allFiles.values()) {
  const rel = path.relative(antSrcDir, f).replace(/\\/g, '/');
  allDirs.add(rel.split('/')[0]);
}

const toDelete = [...allDirs].filter(d => !dirs.has(d));
console.log('\nDirs to DELETE (' + toDelete.length + '):');
toDelete.sort().forEach(d => console.log('  ' + d));