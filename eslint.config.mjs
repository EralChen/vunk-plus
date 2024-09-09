import lintConfigArr from '@lib-env/eslint-config'

export default [
  ...lintConfigArr,
  {
    rules: {
      'vue/no-v-html': 'off', 
    },
  },
  
  {
    ignores: [
      'node_modules',
      'dist',
      'pnpm-lock.yaml',
      'CHANGELOG.en-US.md',
      '!.*',
      'docs/components.d.ts',
      'coverage',
      'ssr-testing/cases/*',
    ],
  },
]

