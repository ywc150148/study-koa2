const fs = require('fs')
const path = require('path')
const moment = require('moment');
const { asyncStat, formatBytes, saveFile,getForMat } = require('../../../../lib')
const { put} = require('../../../../lib/oss')
// const imgExifRead = require('../../../../lib/imgexifread')
const {domain} = require('../../../../config')
require('moment/locale/zh-cn')
moment.locale('zh-cn');

module.exports = async (ctx, next) => {
  // 单个文件上传
  const file = ctx.request.files.file; // 获取上传文件
  console.log("file",file)
  const fileFormat = getForMat(file.name) // 图片格式
  console.log("file.name.split('.')",file.name.split('.'))
  const time = new Date().getTime()
  const uploadTime = moment(time).format("YYYY-MM-DD-HH-mm-ss"); // 日期
  const randomNumber = Math.floor(Math.random() * 1000 + 1); // 随机数
  const fileName = `${uploadTime}-rn${randomNumber}.${fileFormat}` // 文件名称
  const uploadFilePath = 'static/upload/images' // 服务器文件夹路径
  let filePath = path.resolve(uploadFilePath, fileName); // 拼接路径

  let size = null;
  // 读取文件大小
  const statRes = await asyncStat(file.path)
  !statRes.err && (size = formatBytes(statRes.size))

  // 保存文件到本地
  // const saveRes = await saveFile(file.path, filePath)
  // saveRes.err && ctx.throw(500,saveRes.msg)

  // 读取图片exif
  // let exif = await imgExifRead(file.path)
  
  const ossFolder = 'upload/images/' // oss 文件夹
  const ossUploadFileName = ossFolder + fileName // 上传oss文件的路径+名称

  let ossResult = await put(ossUploadFileName, file.path);

  // 上传到oss出错
  if(ossResult.err) {
    return ctx.body = {
      status: false,
      code: 500,
      msg: ossResult.msg,
    }
  }

  return ctx.body = {
    status: true,
    code: 200,
    msg: '图片上传成功',
    data: {
      upload_time: moment(time).format("YYYY-MM-DD HH:mm:ss"),
      create_time: time,
      time_cost:Date.now() - time + 'ms',
      file_format:fileFormat,
      file_size:statRes.size,
      size,
      name:ossResult.data.name,
      url:domain+ossResult.data.name,
      oss_url:ossResult.data.url,
    }
  };
}