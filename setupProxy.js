const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api',
    {
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      },
      target: "http://192.168.0.106:1006"
    }
  ))
} 
