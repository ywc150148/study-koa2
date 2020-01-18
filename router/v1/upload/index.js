const Router = require('koa-router')
const router = new Router()

// 引入控制器
router
  .get('/', require('./action/image')) // 上传图片页面
  .post('/image', require('./action/upload-image')) // 上传图片
  .get('/file', require('./action/file')) // 上传文件页面
  .post('/file', require('./action/upload-file')) // 上传文件

module.exports = router
