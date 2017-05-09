var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session        = require("express-session");
const auth           = require('./helpers/auth');
const flash          = require("connect-flash");
const mongoose = require('mongoose');



var index = require('./routes/index');
var users = require('./routes/users');
var api   = require('./routes/api');
// var explore = require('./routes/explore');

var app = express();

mongoose.connect('mongodb://heroku_klg4wkp7:ev9h5uksaeuuc3dhod8iqh6n7k@ds157500.mlab.com:57500/heroku_klg4wkp7');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout/main-layout');

app.use(expressLayouts);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret           : "passport-local-strategy",
  resave           : true,
  saveUninitialized: true,
  cookie           : { maxAge: 60000 }
}));

app.use(flash());
const passport = require('./helpers/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(auth.setCurrentUser);

app.use('/api', api);
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
