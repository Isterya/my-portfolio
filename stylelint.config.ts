import type { Config } from 'stylelint';

const config: Config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss'],
  rules: {
    'prettier/prettier': true,

    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,

    'selector-class-pattern': null,

    'no-empty-source': null,

    'declaration-block-trailing-semicolon': 'always',
    'block-no-empty': true,
    'color-no-invalid-hex': true,
  },
  ignoreFiles: ['**/*.ts', '**/*.tsx', '**/*.js'],
};

export default config;
