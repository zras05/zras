
/* GET resume page. */

var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const mysqlConfig = require('./mysqlConfig.js');

const connection = mysql.createConnection({
  ...mysqlConfig
})

connection.connect();

router.get('/info', function (req, res, next) {
  const sql = 'SELECT * FROM resume'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        code: 1,
        message: 'Error',
        data: null
      })
    }
    const data = results[0]
    data.education = data.education.split('#')
    return res.json({
      code: 0,
      message: 'OK',
      data
    })
  })
});

module.exports = router;
