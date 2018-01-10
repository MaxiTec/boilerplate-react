const path = require('path')
const endPath = path.resolve(__dirname, 'assets')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./webpack.dev.js')
const options = {
  contentBase: endPath,
  hot: true,
  host: 'localhost'
}

WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(9000, 'localhost', () => {
  console.log('dev server listening on port 9000')
})
