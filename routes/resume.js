
/* GET resume page. */

var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const mysqlConfig = require('./config/mysql.js');

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
    data.work = data.work.split('#')
    return res.json({
      code: 0,
      message: 'OK',
      data
    })
  })
});

router.get('/project', function (req, res, next) {
  const sql = 'SELECT * FROM project'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        code: 1,
        message: 'Error',
        data: null
      })
    }
    let data = []
    for (const i in results) {
      data.push({
        pid: results[i].pid,
        name: results[i].name
      })
    }
    data = data.reverse()
    return res.json({
      code: 0,
      message: 'OK',
      data
    })
  })
});

router.get('/project/:pid', function (req, res, next) {
  const pid = req.params.pid;
  const sql = 'SELECT * FROM project where pid = "' + pid + '"';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        code: 1,
        message: 'Error',
        data: null
      })
    }
    const data = results[0]
    data.functions = data.functions.split('#')
    data.introduction = data.introduction.split('#')
    data.time = data.time.split('#')
    for (const j in data.time) {
      data.time[j] = parseInt(data.time[j])
    }
    data.skills = JSON.parse(data.skills)
    return res.json({
      code: 0,
      message: 'OK',
      data
    })
  })
});

router.get('/company', function (req, res, next) {
  const sql = 'SELECT * FROM company'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.json({
        code: 1,
        message: 'Error',
        data: null
      })
    }
    for (const i in results) {
      results[i].describe = results[i].describe.split('#')
      results[i].label = results[i].label.split('#')
      results[i].time = results[i].time.split('#')
      for (const j in results[i].time) {
        results[i].time[j] = parseInt(results[i].time[j])
      }
    }
    return res.json({
      code: 0,
      message: 'OK',
      data: results
    })
  })
});

module.exports = router;
