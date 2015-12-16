myApp.factory('userFactory', function ($http) {
	var factory = {}
	//Data
	var users = []
	var current_user = {}
	var currentPosition = {}

	factory.addUser = function(info, callback){
		$http.post('/newUser', {info}).success(function (data){
			current_user = data
			console.log(data)
			users.push(data)
			console.log(users)
			callback()
		})
	}

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

	return factory
})