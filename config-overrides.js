const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'module-resolver',
    {
      alias: {
        '@action': './src/action',
        '@components': './src/components',
        '@store': './src/store',
        '@loginPage': './src/loginPage',
        '@reducers': './src/reducers',
      },
    },
  ])
);
