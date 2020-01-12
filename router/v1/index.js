const Router = require('koa-router');
const router = new Router();

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
  // 引入模块
  router.use('/home', require('./home').routes());
}
