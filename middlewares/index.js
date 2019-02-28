module.exports = async (ctx, next) => {
    // 信息获取方式和 actions 一样，通过 ctx
    // console.log(`middleware: ${ctx.method} ${ctx.url} ${ctx.query} - ${ms}ms`)
  
    // 如果要继续走路由组件的，不要忘记调用 await next()
    await next()
  
    // 如果不走路由组件了，那就直接 ctx.body = xxx
    // ctx.body = 'Intercept by middleware'
  }