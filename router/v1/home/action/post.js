module.exports = async (ctx, next) => {
  let rq =  ctx.request.body
  return ctx.body =rq
}