/* GET resume page. */

const express = require('express');
const router = express.Router();

const baiduAI = require('../ocr/src/index.js');
const { ocr } = baiduAI;
const fs = require('fs');
const http = require('http');

const baiduAIConfig = require('./baiduAIConfig.js');
const { APP_ID, API_KEY, SECRET_KEY } = baiduAIConfig

const client = new ocr(APP_ID, API_KEY, SECRET_KEY);
const testurl3 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597596745650&di=cb5bcd3dcc2bd035cf60d93f431432c0&imgtype=0&src=http%3A%2F%2Fimage.game.uc.cn%2F2015%2F12%2F8%2F11576324.jpg'

const options = {};
options["detect_direction"] = "true";
options["probability"] = "true";
options['language_type'] = 'JAP';

const image = fs.readFileSync('asset/testimg.jpg').toString("base64");

 router.get('/image', function (req, res, next) {
  client.generalBasic(image, options).then(function (result) {
    return res.json({
      code: 0,
      message: 'OK',
      data: result
    })
  }).catch(function (err) {
    console.log(err);
  });
})

router.get('/url', function (req, res, next) {
  client.generalBasicUrl(testurl3, options).then(function (result) {
    return res.json({
      code: 0,
      message: 'OK',
      data: result
    })
  }).catch(function (err) {
    console.log(err);
  });
})

module.exports = router;