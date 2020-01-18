const Router = require('koa-router')
const router = new Router()

// 引入控制器
router
  .get('/', require('./action/get')) // 上传文件页面
  .post('/', require('./action/post')) // 上传文件
  .get('/img', require('./action/img')) // 上传图片页面
  .get('/image', require('./action/image')) // 上传图片页面
  .post('/img', require('./action/upload-img')) // 上传图片

module.exports = router
