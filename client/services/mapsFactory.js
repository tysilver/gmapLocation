myApp.factory('mapsFactory', function ($http) {
	var factory = {}
	//Data
	var places = [];

	factory.getAllLocations = function(callback){
		$http.get('/getLocations').success(function(data){
			places = data
			callback(places)
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