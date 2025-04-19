const config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss'],
  rules: {
    'prettier/prettier': true,

    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,

    'selector-class-pattern': null,

    'no-empty-source': null,
  },
  ignoreFiles: ['**/*.ts', '**/*.tsx'],
};

export default config;
