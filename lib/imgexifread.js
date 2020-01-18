var fs = require('fs');
const ExifReader = require('exifreader');
const exifInfo = require("./exif-key").exifInfo

function getExif(filePath, expanded = true) {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(filePath);
      const tags = ExifReader.load(data, { expanded });

      // exif
      let exifObj = tags.exif || {}
      let imgInfo = []
      for (let key in exifObj) {
        let _key = key.replace(/\s+/g, '')
        let name = exifInfo.hasOwnProperty(_key) ? exifInfo[_key] : key
        imgInfo.push({
          name, // 中文备注
          key,
          ...exifObj[key],
        })
      }

      // 按首字母排序
      imgInfo.sort((a, b) => {
        return a.key.charCodeAt(0) - b.key.charCodeAt(0)
      })

      resolve({
        data: { ...tags, list: imgInfo },
        msg: '读取图片exif成功'
      })
    } catch (err) {
      reject({
        err: err.toString() || err,
        msg: '读取图片exif失败',
        tips: '读取失败，建议上传jpeg格式的图片'
      })
    }
  })
}

module.exports = getExif