var users = require('../controllers/users.js')
var places = require('../controllers/places.js')
// var posts = require('../controllers/posts.js')
// var comments = require('../controllers/comments.js')

// app/routes.js
module.exports = function(app, passport) {
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.json({ message: req.flash('loginMessage') }); 
    });

    // // process the login form
    // // app.post('/login', do all our passport stuff here);

    // // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profilePerson', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.json({ message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profilePerson', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profilePerson', isLoggedIn, function(req, res) {
        res.json({user : req.user})
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.json({})
    });

    //PREVIOUS
    app.get('/users', function (req, res){
		users.get_all(req, res);
	});
	app.post('/newUser', function (req, res){
		console.log(req.body.info.name + " made it to the newUser function.")
		users.add(req, res);
	});
	app.post('/updateCurrentUser', function (req, res){
		console.log("And the current user in routes is:")
		console.log(req.body.current_user.name)
		users.getCurrent(req, res);
	});
    app.post('/setLocation', function (req, res){
        console.log("IN the routes...")
        console.log(req.body.info)
        places.add(req, res);
    });
    app.get('/getLocations', function (req, res){
        places.get_all(req, res);
    });
    app.post('/getUserLocations', function (req, res){
        console.log(req.body.info)
        places.getUserLocations(req, res);
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}