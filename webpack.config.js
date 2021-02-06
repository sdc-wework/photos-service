const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'photos-slider.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: 'babel-loader',
      },
    ],
  },
};
