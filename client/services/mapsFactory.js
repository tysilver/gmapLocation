myApp.factory('mapsFactory', function ($http) {
	var factory = {}
	//Data
	var places = [];
	var current_user_places = [];

	factory.getAllLocations = function(callback){
		$http.get('/getLocations').success(function(data){
			places = data
			callback(places)
		})
	}

	factory.getCurrentUserLocations = function(currentUserId, callback){
		console.log(currentUserId)
		var info = {userId: currentUserId}
		$http.post('/getUserLocations', {info}).success(function(data){
			current_user_places = data
			callback(current_user_places)
		})
	}

	factory.setUserLocation = function(info, callback){
		console.log(info.user.name)
		$http.post('/setLocation', {info}).success(function(data){
			console.log(data)
			places.push(data)
			console.log(places)
			callback()
		})
	}

	return factory
})