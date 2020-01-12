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
    ctx.response.body = {
      message: err.message + ' code:' + code
    };
    // 手动释放error事件
    ctx.app.emit('error', err, ctx);
  }
}

