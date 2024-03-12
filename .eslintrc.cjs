module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['plugin:@vkontakte/eslint-plugin/typescript', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vite-env.d.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // note (kmiakaeva): Taken from https://github.com/VKCOM/vkjs/blob/master/.eslintrc.json
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
