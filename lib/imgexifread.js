var fs = require('fs');
var path = require('path');
const ExifReader = require('exifreader');

function getExif(filePath, expanded = true) {
  return new Promise((resolve, reject) => {
    try {
      // var filePath = path.resolve('./logo.png');
      // 同步读取
      let data = fs.readFileSync(filePath);
      const tags = ExifReader.load(data, { expanded });
      resolve({
        data:tags,
        msg: '读取图片exif成功'
      })
    } catch (err) {
      reject({
        err,
        msg: '读取图片exif失败'
      })
    }
  })
}

module.exports = getExif