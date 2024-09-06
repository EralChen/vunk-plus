import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import importLint from 'eslint-plugin-import'
import parserVue from 'vue-eslint-parser'

// import path from 'path'
// import { fileURLToPath } from 'url'
// import { FlatCompat } from '@eslint/eslintrc'
// import pluginJs from '@eslint/js'
// mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const compat = new FlatCompat({ 
//   baseDirectory: __dirname, 
//   recommendedConfig: pluginJs.configs.recommended, 
// })

export default [
  { 
    languageOptions: { 
      globals: globals.browser,
    },
  },
  ...pluginVue.configs['flat/recommended'],
  ...tseslint.configs.recommended,

  {
    plugins: {
      import: importLint,
      '@typescript-eslint': tseslint.plugin,
      // jest: jestPlugin,
    },
  },
  { 
    languageOptions: { 
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        'parser': tseslint.parser,
      },
    },
  },

  // ...compat.extends(),
  // ...pluginVue.configs['flat/essential'],
  {
    rules: {
      // https://eslint.org/docs/rules/ for js
      'no-console': 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'quotes': ['error', 'single', { avoidEscape: true, 'allowTemplateLiterals': true }],
      'comma-dangle': ['error', 'always-multiline'], // multiline object ,
      'indent': ['error', 2],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'always',
        'asyncArrow': 'always',
      }],
      'keyword-spacing': ['error', {
        'before': true,
        'after': true,
      }],
      'space-infix-ops': ['error', { 'int32Hint': false }],
      // eqeqeq: ['error', 'smart'],
      semi: ['error', 'never'],
      'no-whitespace-before-property': 'error',
      'key-spacing': ['error', { 'afterColon': true }],
      '@typescript-eslint/no-var-requires': 'off',
      // for ts
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/func-call-spacing': ['error', 'never'],
      // for vue
      'vue/multi-word-component-names': 'off',
      'vue/prefer-import-from-vue': 'off',
      'vue/html-self-closing': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/no-v-for-template-key': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/max-attributes-per-line': 'off',

      // for import
      'import/no-duplicates': 'error', // 禁止重复 import 同一模块

    },
  },
]
