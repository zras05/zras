var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.json({
    code: 0,
    message: '访问成功',
    data: null
  })
});

module.exports = router;
