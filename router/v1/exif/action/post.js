const path = require('path')
const moment = require('moment');
const { asyncStat, formatBytes } = require('../../../../lib') 
const imgExifRead = require('../../../../lib/imgexifread') 
require('moment/locale/zh-cn')
moment.locale('zh-cn');

module.exports = async (ctx, next) => {

  const file = ctx.request.files.file; // 获取上传文件 
  const fileFormat = file.name.split('.')[1] || 'jpeg' // 图片格式
  const time = new Date().getTime() // 时间

  // 读取文件大小
  let size = null;
  const statRes = await asyncStat(file.path)
  !statRes.err && (size = formatBytes(statRes.size))

  // 读取图片exif
  let exif = await imgExifRead(file.path)
  
  if(exif.err) {
    return ctx.body = {
      status: false,
      code: 500,
      msg: exif.msg,
      err:exif.err
    };
  }

  return ctx.body = {
    status: true,
    code: 200,
    msg: '图片exif读取成功',
    data: {
      time: moment(time).format("YYYY-MM-DD HH:mm:ss"),
      create_time: time,
      time_cost:Date.now() - time + 'ms',
      file_format:fileFormat,
      file_size:statRes.size,
      size,
      ...exif.data
    }
  };
}