var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');

require('./server/config/passport.js')(passport);

app.use(bodyParser());
app.use(bodyParser.json());

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(express.static(path.join(__dirname, "./")));
app.set('views', path.join(__dirname, './client/views'));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app, passport);

app.listen(8000, function(){
	console.log("Listening on 8000")
});