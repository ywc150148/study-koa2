let OSS = require('ali-oss')
const { accessKeyId, accessKeySecret } = require('../key')

let client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId,
  accessKeySecret,
  bucket: 'eoway-images',
  secure: true // 开启https
});

async function put(objectName, localFile) {
  try {
    //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
    let result = await client.put(objectName, localFile);
    return {
      err: false,
      data: result,
      msg: "上传图片到oss成功"
    }
  } catch (err) {
    return {
      err,
      msg: "上传图片到oss失败"
    }
  }
}

module.exports = {
  client,
  put
}
