myApp.factory('mapsFactory', function ($http) {
	var factory = {}
	//Data
	var places = [];
	var current_user_places = [];
	var count = 0;
	var added = false;

	factory.getAllLocations = function(callback){
		$http.get('/getLocations').success(function(data){
			places = data
			callback(places)
		})
	}

	factory.getOneLocation = function(placeId, callback){
		var myPlace = _.find(current_user_places, function(place){ return place._id == placeId; });
		callback(myPlace)
	}

	factory.getCurrentUserLocations = function(currentUser, myRoute, callback){
		console.log(currentUser)
		var info = {userId: currentUser._id}
		console.log(myRoute)
		//ROOM HERE TO AVOID POST ROUTE IF added = false
		$http.post('/getUserLocations', {info}).success(function(data){
			current_user_places = data
			var title = "All of " + currentUser.local.name.split(" ")[0] + "'s " 
			if (myRoute == "all") {
				title += "Places" 
				callback(current_user_places, title)
			} else if (myRoute == "favs") {
				title += "Favorite Places"
				var favs = _.filter(current_user_places, function(place){ return place.favorite == true; });
				callback(favs, title)
			} else if (myRoute == "leisure") {
				title += "Places of Leisure"
				var leisure = _.filter(current_user_places, function(place){ return place.type == "leisure"; });
				callback(leisure, title)
			} else if (myRoute == "travel") {
				title += "Travel Destinations"
				var travel = _.filter(current_user_places, function(place){ return place.type == "travel"; });
				callback(travel, title)
			} else if (myRoute == "recent") {
				title += "Recent Places"
				if (current_user_places.length < 10) {
					callback(current_user_places, title)
				} else {
					var recent = current_user_places.splice(current_user_places.length - 10)
					callback(recent, title)
				}
			}
		})
	}

	factory.setUserLocation = function(info, callback){
		console.log(info.user.local.name)
		$http.post('/setLocation', {info}).success(function(data){
			console.log(data)
			places.push(data)
			console.log(places)
			added = true;
			callback()
		})
	}

	factory.updateUserLocation = function(info, callback){
		console.log(info.user.local.name)
		$http.post('/updateLocation', {info}).success(function(data){
			console.log(data)
			places = data
			console.log(places)
			added = true;
			callback()
		})
	}

	return factory
})