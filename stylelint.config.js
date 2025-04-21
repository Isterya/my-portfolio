import standardScss from 'stylelint-config-standard-scss';

export default [
  {
    customSyntax: 'postcss-scss',
    files: ['**/*.scss'],
    plugins: [],
    rules: {
      ...standardScss.rules,
      'order/properties-order': null,
      'property-no-vendor-prefix': null,
      'value-no-vendor-prefix': null,
      'selector-no-vendor-prefix': null,
      'declaration-block-no-duplicate-properties': null,
      'no-descending-specificity': null,
    },
  },
];
