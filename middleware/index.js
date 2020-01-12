// 需要安装的中间件
let _module = [
  'catch-errors'
]

module.exports = (app) => {

  for (let key of _module) {
    app.use(require(`./${key}`))
  }

} 