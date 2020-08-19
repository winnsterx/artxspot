const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              // "@font-face": {
              //   "font-family": "Proxima_Nova",
              //   src: "url('src/font/ProximaNova.woff2') format('woff2')",
              // },
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
