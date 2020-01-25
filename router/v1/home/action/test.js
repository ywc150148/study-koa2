module.exports = async (ctx, next) => {
  let rq = ctx.request
  return ctx.body = {
    data: rq,
    name: '这里是中文'
  }
}