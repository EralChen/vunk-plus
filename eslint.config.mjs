import lintConfigArr from '@lib-env/eslint-config'

export default [
  ...lintConfigArr,
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

