/* GET resume page. */

const express = require('express');

const router = express.Router();

const baiduOCR = require('../ocr/src/index.js');
const { ocr } = baiduOCR;
const fs = require('fs');
const md5 = require('md5');
const axios = require('axios');

const baiduAIConfig = require('./config/baidu.js');
const { APP_ID, API_KEY, SECRET_KEY, appid, key } = baiduAIConfig
const client = new ocr(APP_ID, API_KEY, SECRET_KEY);
const options = {};
options['probability'] = 'true';
options['paragraph'] = 'true';
options['vertexes_location'] = 'true';
options['recognize_granularity'] = 'small';

const getTransArray = async (ocrArray, lang) => {
  if (!ocrArray) {
    return false
  }
  const salt = new Date().getTime();
  const q = ocrArray.join('\n'); // 多个query可以 \n 连接 
  const params = {
    appid,  salt, q, to: 'zh',
    from: lang ? lang : 'auto',
    sign: md5(appid + q + salt + key), // appid+q+salt+密钥 的MD5值
  }
  const transResult = await axios({
    method: 'get',
    url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
    params
  }).then(({data}) => data)
  return transResult
}

const getOcrArray = (result) => {
  if (!result) {
    return false
  }
  const words_result = result.words_result
  const ocrResult = []
  for (const i in words_result) {
    if (words_result[i]) {
      ocrResult.push(words_result[i].words)
    }
  }
  return ocrResult
}

const getOcrWithLocation = (result) => {
  if (!result){
    return false
  }
  const words_result = result.words_result
  let ocrResult = []
  for (const i in words_result) {
    if (words_result[i]) {
      ocrResult = [...ocrResult, ...words_result[i].chars]
    }
  }
  return ocrResult
}

router.post('/', function (req, res, next) {
  const data = req.body;
  options['language_type'] = data.ocrlang;
  options['image'] = data.image;
  const image = data.image;
  client.generalBasicUrl(image, options).then(async (result) => { // 不含位置 5000次
    const transResult = await getTransArray(getOcrArray(result), data.translang)
    return res.json({
      code: 0,
      message: 'OK',
      data: transResult
    })
  }).catch(function (err) {
    return res.json({
      code: 1,
      message: 'Error',
      data: err
    })
  });
})

router.post('/location', function (req, res, next) {
  // const image = fs.readFileSync('asset/testimg.jpg').toString('base64');
  options['language_type'] = req.body.lang;
  client.general(req.body.image, options).then(function (result) { // 含位置 500次
    const ocrResult = getOcrWithLocation(result)
    return res.json({
      code: 0,
      message: 'OK',
      data: {
        ocrResult
      }
    })
  }).catch(function (err) {
    return res.json({
      code: 1,
      message: 'Error',
      data: err
    })
  });
})

module.exports = router;