var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
let expressValidator = require("express-validator")
let expressSession = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config()

var port = process.env.PORT || '8000';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// add for Heroku
mongoose.set("debug", true)
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODBURL, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.log('mongoose connected');
  },
    err => {
      console.log('mongoose did not connect', err);
    }

  )

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator()); // Should be after the Parsers and will be available for all router
app.use(expressSession(
  { secret: 'max', saveUninitialized: false, resave: false })
);
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use("/images", express.static('images'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server run on por ${port}`);
})

module.exports = app;
