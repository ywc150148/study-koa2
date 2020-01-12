const koaStatic = require('koa-static'); // 静态资源处理
const koaNunjucks = require('koa-nunjucks-2'); // 模板引擎
const koaBody = require('koa-body');
const cors = require('koa2-cors'); // 跨域
const path = require('path');

module.exports = (app) => {

  app.use(cors());
  // // 跨域
  // app.use(cors({
  //   origin: "*",
  //   methods: ['GET', 'POST', 'DELETE', 'PUT'],
  //   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  // }));

  app.use(koaBody({
    multipart: true, // 支持文件上传
    // encoding: 'gzip', // 开了请求post失败
    formidable: {
      // uploadDir: path.join(__dirname, '../static/upload/file'), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => { // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    }
  }));

  app.use(koaStatic(path.resolve(__dirname, '../static/'))); // 根目录static文件夹

  app.use(koaNunjucks({
    ext: 'html', // 指定视图文件默认后缀
    path: path.join(__dirname, '../view/'), // 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义，防止Xss漏洞
    }
  }));

  // 需要安装的中间件
  const middlewares = [
    'catch-errors'
  ]

  for (let key of middlewares) {
    app.use(require(`./${key}`))
  }

} 