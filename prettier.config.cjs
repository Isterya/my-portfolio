/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
  arrowParens: 'always',

  jsxSingleQuote: false,
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',

  embeddedLanguageFormatting: 'auto',
  proseWrap: 'always',

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      options: {
        parser: 'babel',
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
      },
    },
  ],
};

module.exports = config;
