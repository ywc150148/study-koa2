const Router = require('koa-router')
const router = new Router()

// 引入控制器
router
  .get('/', require('./controller/get'))
  .get('/test', require('./controller/test'))
  .post('/', require('./controller/post'))

module.exports = router
