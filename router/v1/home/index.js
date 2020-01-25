const Router = require('koa-router')
const router = new Router()

// 引入控制器
router
  .get('/', require('./action/get'))
  .post('/', require('./action/post'))
  .post('test', require('./action/test'))

module.exports = router



