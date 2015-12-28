myApp.factory('userFactory', function ($http) {
	var factory = {}
	//Data
	var users = []
	var current_user = {}
	var currentPosition = {}

	factory.addUser = function(info, callback) {
        console.log("We went to the addUser method")
        $http.post('/signup', {name: info.name, email: info.email, password: info.password, created_at: info.created_at}).success(function (output){
            if (output.user) {
                current_user = output.user;
            }
            console.log("And the output for the addUser post method was: ")
            console.log(output.user.local)
            callback(output);
        });
    };

    factory.login = function(info, callback){
        console.log("Here is the info we should be sending...")
        console.log(info)
        $http.post('/login', info).success(function (output){
            if (output) {
                current_user = output.user;
                console.log("We sent the user back with: ")
                console.log(output.user)
            }
            callback(output);
        });
    };

	factory.getCurrentUser = function(callback){
		callback(current_user)
	}

	factory.updateCurrentUser = function(callback){
		console.log(current_user)
		$http.post('/updateCurrentUser', {current_user}).success(function(data){
			current_user = data
			callback()
		})
	}

	factory.setCurrentPosition = function(info){
		currentPosition = info
	}

	factory.getCurrentPosition = function(callback){
		callback(currentPosition)
	}

	factory.logout = function(callback){
		$http.get('/logout').success(function(data){
			users = []
			current_user = {}
			currentPosition = {}
			callback()
		})
	}

	return factory
})