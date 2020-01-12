const Koa = require('koa'); 
const app = new Koa(); 
const router =  require('./router') // 路由
require('./middleware')(app) // 中间件

// logger
app.use(async (ctx, next) => {
  const start = Date.now(); 
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`请求方式：${ctx.method};\n\r请求路径： ${ctx.url};\n\r响应时间：${ms}ms;`);
});

// x-response-time
app.use(async (ctx, next) => {
  await next();
});

// 继续触发error事件
app.on('error',(err,ctx) => {
  // console.error('server error-------', err.message);
  // console.error('err-------',err.toString());
});

router(app) // 实例化路由

app.listen(3000,()=>{
  console.log('This server is running at http://localhost:' + 3000)
});