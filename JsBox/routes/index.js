var express = require('express');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var verifyCode = require('../service/verifyCode.js');
var router = express.Router();
var secret = 'menuPath';

var onlinePath = path.join(__dirname, '../file/code/javascript/online')
var tempPath = path.join(__dirname, '../file/code/javascript/temp')

router.get('/verify', function (req, res, next) {
  var data = verifyCode.getCode()
  data.answer = encode(data.answer)
  res.json({
    success: true,
    data: data
  })
})

router.get('/codeList', function(req, res, next) {
  var list = []
  fs.readdirSync(onlinePath).forEach(function (fileName) {
    if(fs.statSync(path.join(onlinePath, fileName)).isFile()){
      list.push({
        title: fileName,
        id: encode(path.join(onlinePath,fileName))
      })
    }
  })
  res.json({
    success: true,
    list: list
  })
});

router.get('/codeDetail', function(req, res, next) {
  var filePath = decode(req.query.id)
  fs.readFile(filePath,'utf-8',function(err, data){
    if(err){
      res.json({
        success: false
      })
    }else{
      var dirs = filePath.split(path.sep)
      res.json({
        success: true,
        title: dirs[dirs.length - 1],
        content: data
      })
    }
  })
});

router.post('/add', function (req, res, next) {
  var token = req.body.token
  var title = req.body.title
  var content = req.body.content
  var answer = req.body.answer
  var option = req.body.option
  if (answer !== encode(option)) {
    res.json({ success: false, msg: '验证码错误'  })
    return
  }
  var dirPath = null
  if (token && token === '123456') {  // token正确
    if (createDir(onlinePath)) {
      dirPath = onlinePath
    } else {
      res.json({ success: false, msg: '添加失败'  })
    }
  } else {
    if (createDir(tempPath)) {
      dirPath = tempPath
    } else {
      res.json({ success: false, msg: '添加失败'  })
    }
  }
  var newFilePath = path.join(dirPath, title)
  fs.writeFile(newFilePath, content, function(err) {
    if(err) {
      res.json({ success: false, msg: '添加失败' })
    }
  })
  res.json({ success: true })
})

function createDir (path) {
  if (!fs.existsSync(path)) {
    if (fs.mkdirSync(path)) {
      return false
    }
  }
  return true
}

/**
* 路径编码
* @param path
* @returns {*}
*/
function encode (path) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(path, 'utf8', 'hex');//编码方式从utf-8转为hex;
  enc += cipher.final('hex');//编码方式从转为hex;
  return enc
}

/**
 * 路径解码
 * @param path
 * @returns {*}
 */
function decode (path) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(path, 'hex', 'utf8');//编码方式从hex转为utf-8;
  dec += decipher.final('utf8');//编码方式从utf-8;
  return dec
}

module.exports = router;
