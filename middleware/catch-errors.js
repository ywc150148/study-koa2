/**
 * des: 捕捉错误、处理
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let code = err.statusCode || err.status || 500;
    ctx.response.status = code;
    // 如果不使用return，则由app.js的 on error事件处理
    // return ctx.response.body = {
    //   message: err.message,
    //   code
    // };
    // 手动释放error事件
    ctx.app.emit('error', err, ctx);
  }
}

