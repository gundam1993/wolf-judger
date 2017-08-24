const path = require('path')
const express = require('express')
const app = express()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.dev')
const server = require('http').Server(app)
const gameServer = require('./game_server')

const isDev = process.env.NODE_ENV !== 'production'
const DEFAULT_PORT = 3000
const compiler = webpack(config)
const DIST_DIR = path.join(__dirname, 'dist')
const HTML_FILE = path.join(__dirname, 'index.html')
const STATIC_DIR = path.join(__dirname, 'static')
const PRD_HTML_FILE = path.join(__dirname, 'dist/index.html')

app.set("port", process.env.PORT || DEFAULT_PORT)

if (isDev) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(STATIC_DIR))
  app.get("/", (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err,result) => {
      if (err) {
        console.log(err)
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  app.use(express.static(DIST_DIR))
  app.use(express.static(STATIC_DIR))
  app.get('/', (req, res) => res.sendFile(PRD_HTML_FILE))
}

gameServer.listen(server)
server.listen(app.get('port'), function () {
  console.log('Server listening on port 3000')
})

