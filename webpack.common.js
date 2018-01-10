const webpack = require('webpack')
const path = require('path')
const endPath = path.resolve(__dirname, 'public')
const nib = require('nib')
const rupture = require('rupture')
const ExtractWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

require('babel-polyfill')

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new ExtractWebpackPlugin('css/estilos.css'),
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common' // Specify the common bundle's name.
  })
]

const useStylus = (process.env.NODE_ENV === 'production') ? ExtractWebpackPlugin.extract({
  fallback: 'style-loader',
  use: [{
    loader: 'css-loader'
  },
  {
    loader: 'stylus-loader',
    options: {
      use: [nib(), rupture()],
      import: ['~nib/lib/nib/index.styl']
    }
  }
  ]
}) : [{
  loader: 'style-loader'
},
{
  loader: 'css-loader'
},
{
  loader: 'stylus-loader',
  options: {
    use: [nib(), rupture()],
    import: ['~nib/lib/nib/index.styl']
  }
}
]

let webPack = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  // context: path.resolve(__dirname, 'src'),
  cache: true,
  entry: {
    common: 'babel-polyfill',
    app: './src/index.js'
  },
  output: {
    path: endPath,
    filename: './js/[name].bundle.js'
  },
  // externals: {
  //   jquery: 'jQuery'
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.styl$/,
        use: useStylus,
        exclude: path.resolve(__dirname, 'src', 'styles')
      },
      {
        test: /\.(jpe?g|gif|png)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/', // solo para produccion
            publicPath: (process.env.NODE_ENV === 'production') ? '../' : 'http://localhost:9000/'
          }
        }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      }
    ]
  },
  plugins: plugins
}

module.exports = webPack
