var users = require('../controllers/users.js')
var places = require('../controllers/places.js')
// var posts = require('../controllers/posts.js')
// var comments = require('../controllers/comments.js')

module.exports = function(app){
	app.get('/users', function (req, res){
		users.get_all(req, res);
	});
	app.post('/newUser', function (req, res){
		console.log(req.body.info.name + " made it to the newUser function.")
		users.add(req, res);
	});
	app.post('/setLocation', function (req, res){
		console.log("IN the routes...")
		console.log(req.body.info)
		places.add(req, res);
	});
	app.get('/getLocations', function (req, res){
		places.get_all(req, res);
	});
	app.post('/updateCurrentUser', function (req, res){
		console.log("And the current user in routes is:")
		console.log(req.body.current_user.name)
		users.getCurrent(req, res);
	});
}