const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resumeRouter = require('./routes/resume');
const ocrRouter = require('./routes/ocr');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* 
  限制上传参数大小 
  ocr上传图片大小限制5M
*/
const limit = 5 * 1024 * 1024;
app.use(logger('dev'));
app.use(express.json({ limit: limit + 'kb' }));
app.use(express.urlencoded({ limit: limit + 'kb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resume', resumeRouter);
app.use('/ocr', ocrRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* 跨域处理 */
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Content-Type', 'application/x-www-form-urlencoded');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

module.exports = app;