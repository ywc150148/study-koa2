// const _module = [
//   'error-handler',
//   "hh"
// ]

// for(let key of _module) {
//   console.log("key:",key)
// }


// var fs = require('fs');
// var path = require('path');
// const ExifReader = require('exifreader')
// var filePath = path.resolve('./logo.png');
// let data = fs.readFileSync(filePath);
// const tags = ExifReader.load(data, {expanded: true});
// console.log("tags",tags)
var path = require('path');
const { dirExists, saveFile } = require('../lib/index')
let tmp =  path.resolve('../static/upload/tmp');
console.log("tmp:",tmp)
dirExists(tmp).then(res=>{
  console.log("res",res)
})