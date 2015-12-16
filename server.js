var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./")));
app.set('views', path.join(__dirname, './client/views'));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000);