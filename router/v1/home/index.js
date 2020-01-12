const Router = require('koa-router')
const router = new Router()

// 引入控制器
router
  .get('/', require('./action/get'))
  .get('/test', require('./action/test'))
  .post('/', require('./action/post'))

module.exports = router
