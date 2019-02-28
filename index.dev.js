/* 引用基本类库 */
const Koa = require('koa')
const Router = require('koa-router')

/* 允许使用*等符号,获取匹配对应规则的文件 */
const glob = require('glob')

/* 开发环境，不刷新下的热更新,基于webpack4+ */
const koaWebpack = require('koa-webpack')
/* 合并前后端路由 适合给KOA使用的中间件*/
const history = require('koa2-history-api-fallback')

const koaStatic = require('koa-static')
//const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const {getRouterPath, log} = require('./utils/common')
const webpackConfig = require('./vue/webpack.config.js')

//const index = require('./routes/index')
//const users = require('./routes/users')
const app = new Koa()
const router = new Router()
//可变成可配置的放入指定文件去获取
const PORT = 8333

process.env.NODE_ENV = 'development'

registerApp()

 // error handler
 onerror(app)

 // middlewares
 app.use(bodyparser({
     enableTypes:['json', 'form', 'text']
 }))
 app.use(json())
 app.use(logger())

async function registerApp () {
  //打印请求地址
  app.use(async (ctx, next) => {
    log.info(ctx.url)
    await next()
  })

  try {
    // node 端中间件和路由
    await registerMiddlewares();
    await registerRoutes();

    /* 路由融合-路由注册顺序：先后端再前端 */
    // 后端(koa)路由
    // koa-router 的单个注册部分省略
    app.use(router.routes());
    app.use(router.allowedMethods());

    // 前端(vue)路由
    // 所有 navigate 请求重定向到 '/'，因为 webpack-dev-server 只服务这个路由
    app.use(history({
        htmlAcceptHeaders: ['text/html'],
        index: '/',
        verbose: true,//true:不打印日志
        disableDotRule: true
    }));
    app.use(koaStatic('public'));
    await registerWebpack();

    app.listen(PORT);

    log.info('开发环境服务器启动于端口号', PORT, '等待 webpack 编译中，请稍候。\n\n');
  } catch (e) {
    log.error(e)
    log.error('开发环境服务器启动失败\n\n')
  }
}

async function registerRoutes () {
  return new Promise((resolve, reject) => {
    glob('actions/**/*.js', (err, files) => {
      if (err) {
        log.error('读取 actions 失败')
        log.error(err)
        reject()
        return
      }

      files.forEach(actionPath => {
        let action = require(`./${actionPath}`)
        if (typeof action.handler !== 'function') {
          log.warn(actionPath, '不是一个合法的 action，已经跳过')
          return
        }
        if (!action.routerPath) {
          action.routerPath = getRouterPath(actionPath)
        }
        router.get(action.routerPath, action.handler)
      })

      resolve()
    })
  })
}

async function registerMiddlewares () {
  return new Promise((resolve, reject) => {
    glob('middlewares/**/*.js', (err, files) => {
      if (err) {
        log.error('读取 middlewares 失败')
        log.error(err)
        reject()
        return
      }

      files.forEach(middlewarePath => {
        let middleware = require(`./${middlewarePath}`)
        if (typeof middleware !== 'function') {
          return
        }

        router.use(middleware)
      })

      resolve()
    })
  })
}

async function registerWebpack() {
  return new Promise(resolve => {
    // 注意koaWebpack是个异步，所以和其他 app.use 以及最终的 app.listen 必须在一起执行
    // 可以使用 async/await 或者 Promise 保证这一点
    koaWebpack({
      config: webpackConfig,
      devMiddleware: {
        stats: 'minimal'
      }
    }).then(middleware => {
      app.use(middleware)
      resolve()
    })
  })
}














// // error handler
// onerror(app)

// // middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
// app.use(json())
// app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
