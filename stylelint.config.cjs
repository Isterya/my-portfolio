module.exports = {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss', 'stylelint-order'],
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**', 'server/dist/**', 'coverage/**'],
  rules: {
    'order/properties-order': null,
    'selector-class-pattern': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'declaration-block-no-duplicate-properties': null,
    'no-descending-specificity': null,
    'keyframes-name-pattern': null,
  },
};
