// require in mongoose
var mongoose = require('mongoose');

// require in fs
var fs = require('fs');

// connect to our database ONCE
mongoose.connect('mongodb://localhost/mapUsers7');

// copies the directory path, concats it with the path from
// the config folder to the models folder.
var models_path = __dirname + '/../models';

// loops through each .js file in the path to our models
// folder. all .js files will then be required, creating
// the actual mongoose Model with the schema information.
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})