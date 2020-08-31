const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api',
    {
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
      target: "http://192.168.0.106:1006"
    }
  )) 
  app.use(createProxyMiddleware('/baidu',
  {
    changeOrigin: true,
    pathRewrite: {
      '^/baidu': '',
    },
    target: "http://api.fanyi.baidu.com/api/trans/vip/translate"
  }
))
} 
