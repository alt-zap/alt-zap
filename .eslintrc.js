module.exports = {
  root: true,
  extends: ['vtex'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    // Use vtex-react preset for .tsx files
    {
      files: '**/*.tsx',
      extends: ['vtex-react'],
      rules: {
        'react/jsx-pascal-case': 'off',
        'react/jsx-handler-names': 'off',
      },
    },
    // General overrides
    {
      files: ['*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/prefer-enum-initializers': 'off',
        'no-await-in-loop': 'off',
      },
    },
    // Vite config (fora do tsconfig principal)
    {
      files: ['vite.config.ts'],
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
    // Triple-slash reference na linha 1 (spaced-comment quebraria ///)
    {
      files: ['src/vite-env.d.ts'],
      rules: {
        'spaced-comment': 'off',
      },
    },
    // Override for .ts components only
    {
      files: ['*.ts'],
      rules: {
        'no-console': 'off',
        'import/no-nodejs-modules': 'off',
        'global-require': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
}
