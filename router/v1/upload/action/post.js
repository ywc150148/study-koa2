const fs = require('fs')
const path = require('path')
module.exports = async (ctx, next) => {
  // 单个文件上传
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, '/static/upload/file') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = {
    file,
    filePath,
    j:path.resolve(__dirname,'static/upload/file')
  };

}