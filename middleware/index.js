const koaStatic = require('koa-static'); // 静态资源处理
const koaNunjucks = require('koa-nunjucks-2'); // 模板引擎
const bodyParser = require('koa-bodyparser');
const path = require('path');

module.exports = (app) => {

  app.use(bodyParser({
    multipart: true, // 开启上传
    formLimit: "3mb",
    jsonLimit: "3mb",
    textLimit: "3mb",
    enableTypes: ['json', 'form', 'text'],
    formidable: {
      uploadDir: path.resolve(__dirname, '../static/upload/file'), // 文件默认保存目录
      maxFileSize: 30 * 1024 * 1024 // 30M 设置上传文件大小最大限制，默认 2M (1024 * 1024 * 2)
    },
  }));

  app.use(koaStatic(path.resolve(__dirname, '../static/'))); // 根目录static文件夹

  app.use(koaNunjucks({
    ext: 'html', // 指定视图文件默认后缀
    path: path.join(__dirname, '../view/'), // 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义，防止Xss漏洞
    }
  }));

  app.use(async (ctx) => {
    await ctx.render('hello', {
      title: "首页"
    });
  });

  // 需要安装的中间件
  const middlewares = [
    'catch-errors'
  ]

  for (let key of middlewares) {
    app.use(require(`./${key}`))
  }

} 