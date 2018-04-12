const config = require('./config/config');
const { webpackConfigDev, pluginsDev, webpackConfigPro, pluginsPro } = require('./sdk/webpack.config');

let webpackConfig;

switch (config.env) {
  case 'dev':
    webpackConfig = Object.assign({}, webpackConfigDev(config), {
      plugins: [
        ...pluginsDev(config),
      ],
    });

    break;
  default:
    webpackConfig = Object.assign({}, webpackConfigPro(config), {
      plugins: [
        ...pluginsPro(config),
      ],
    });
}

module.exports = webpackConfig;
