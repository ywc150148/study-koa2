const fs = require('fs')

// 格式化bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 读取文件
function asyncStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, function (err, res) {
      if (err) {
        reject({
          err
        })
      }
      resolve(res)
    })
  })
}

// 保存文件
function saveFile(sourcePath, filePath) {
  return new Promise((resolve, reject) => {
    // 创建可读流
    const reader = fs.createReadStream(sourcePath);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    // 写入完成
    upStream.on('finish', function (res) {
      resolve({err:false,msg:'写入完成'})
    });
    // 写入出错
    upStream.on('error', function (err) {
      reject({ err,msg:'写入失败' })
    });
  })
}

module.exports = {
  formatBytes,
  asyncStat,
  saveFile
}
