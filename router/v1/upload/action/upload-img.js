const fs = require('fs')
const path = require('path')
var moment = require('moment');
require('moment/locale/zh-cn')
moment.locale('zh-cn');
module.exports = async (ctx, next) => {
  // 单个文件上传
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  const fileFormat = file.name.split('.')[1] || 'jpg' // 图片格式
  const time  = new Date().getTime()
  const uploadTime = moment(time).format("YYYY-MM-DD-HH-mm-ss"); // 日期
  const randomNumber = Math.floor(Math.random() * 1000 + 1); // 随机数
  const fileName = `${uploadTime}-rn${randomNumber}.${fileFormat}` // 文件名称
  const uploadFilePath = 'static/upload/images' // 服务器文件夹路径
  let filePath = path.resolve(uploadFilePath, fileName);

  // 创建可写流
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  return ctx.body = {
    status:'success',
    msg:'图片上传成功',
    code:200,
    data:{
      filePath:`/${uploadFilePath}`,
      upload_time:moment(time).format("YYYY-MM-DD HH:mm:ss"),
      create_time:time,
      fileFormat,
      path: `/${uploadFilePath}/${fileName}`
    }
  };
}