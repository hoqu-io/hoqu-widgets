const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css",
});

const webpackConfigBase = config => ({
  entry: {
    app: ['./src/bootstrap.js'],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'prop-types',
      'material-ui/Progress',
    ],
  },

  output: {
    path: config.public,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!hoqu)/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
            },
          ],
          // use style-loader in development
          fallback: "style-loader",
        }),
      },
      {
        test: /\.(png|svg|gif)$/,
        exclude: /fonts/,
        loaders: [
          'file-loader?name=images/[name].[ext]',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        exclude: /images/,
        loaders: [
          'file-loader?name=fonts/[name].[ext]',
        ],
      },
    ],
  },

  externals: {
    AppConfig: JSON.stringify(config.app),
  },

  devtool: 'source-map',
});

const webpackPluginsBase = config => ([
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    'React': 'react',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.[chunkhash].js',
    minChunks: Infinity,
  }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'meta', chunks: ['vendor'], filename: 'js/meta.[chunkhash].js' }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    title: config.app.appName,
    filename: 'index.html',
    template: path.join(__dirname, '/assets/html/index.ejs'),
    inject: true,
  }),
  extractLess,
]);

const webpackConfigDev = config => Object.assign({}, webpackConfigBase(config), {
  cache: true,

  devServer: {
    disableHostCheck: true,
    contentBase: config.public,
    port: typeof config.app.webpackDevServerPort !== 'undefined' ? config.app.webpackDevServerPort : 8080,
    public: typeof config.app.webpackDevServerPublic !== 'undefined' ? config.app.webpackDevServerPublic : 'localhost',
    host: typeof config.app.webpackDevServerHost !== 'undefined' ? config.app.webpackDevServerHost : '0.0.0.0',
    inline: true,
    historyApiFallback: true,
    noInfo: false,
  },
});

const pluginsDev = config => ([
  ...webpackPluginsBase(config),
]);

const webpackConfigPro = config => Object.assign({}, webpackConfigBase(config), {
  cache: false,
});

const pluginsPro = config => ([
  ...webpackPluginsBase(config),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      sequences     : true,
      booleans      : true,
      loops         : true,
      unused      : true,
      warnings    : false,
      drop_console: true,
      unsafe      : true,
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
]);

module.exports = {
  webpackConfigDev,
  pluginsDev,
  webpackConfigPro,
  pluginsPro,
};