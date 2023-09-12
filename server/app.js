//app.json
const Koa = require('koa')
const serve = require('koa-static')
const proxy = require('koa2-proxy-middleware') //代理模块
const app = new Koa()


//代理到beta服务
app.use(
  proxy({
    targets: {
      '/api/(.*)': {
        target: 'https://github-contributions.vercel.app',
        changeOrigin: true
      }
    }
  })
)
//静态资源配置===》  使用绝对路径 指向打包后的文件夹 dist
app.use(serve('../.vitepress/dist'))
app.listen(10003, () => {
  console.log('10003 start')
})
