module.exports = {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss', 'stylelint-order'],
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'order/properties-order': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'declaration-block-no-duplicate-properties': null,
    'no-descending-specificity': null,
  },
};
