const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
    publicPath: '/', // Base path for all assets
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // File extensions to resolve
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle TypeScript files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Handle image files
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve files from the dist directory
    },
    compress: true,
    port: 3000, // Development server port
    historyApiFallback: true, // Enable for React Router
  },
  mode: 'development', // Set to 'production' for production builds
};