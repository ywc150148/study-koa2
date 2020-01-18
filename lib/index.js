const fs = require('fs')
const path = require('path')

// 格式化bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 读取文件信息
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
      resolve({ err: false, msg: '写入完成' })
    });
    // 写入出错
    upStream.on('error', function (err) {
      reject({ err, msg: '写入失败' })
    });
  })
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    })
  })
}

/**
* 创建路径
* @param {string} dir 路径
*/
function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
  let isExists = await getStat(dir);
  //如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) {     //如果该路径存在但是文件，返回false
    return false;
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir;      //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

//判断是否是对象
function isObject(obj) {
  return Object.prototype.toString.call(obj) == '[object Object]';
}

// 获取图片格式
function getForMat(path) {
  var formatArray = ['jpeg','png','gif']
  var format = path.split(".")[path.split(".").length-1].toLowerCase()
  if(formatArray.indexOf(format)<0){
    return formatArray[0] // 默认jpeg
  }
  return format
}

module.exports = {
  formatBytes,
  asyncStat,
  saveFile,
  getStat,
  mkdir,
  dirExists,
  isObject,
  getForMat
}
