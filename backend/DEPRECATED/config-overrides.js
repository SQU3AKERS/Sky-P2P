const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    url: require.resolve('url')
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })),
    // Add ProvidePlugin configuration
    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
  ]);

  return config;
};
