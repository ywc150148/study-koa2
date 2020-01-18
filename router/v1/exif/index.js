const Router = require('koa-router')
const router = new Router()

// 引入控制器
router
  .get('/', require('./action/get')) // 上传文件页面
  .post('/', require('./action/post')) // 上传文件 返回数据

module.exports = router
