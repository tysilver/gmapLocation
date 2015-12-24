var mongoose = require('mongoose');
var Place = mongoose.model('Place');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		add: function (req, res){
			var new_place = new Place({_user: req.body.info.user._id, visible: req.body.info.visible, type: req.body.info.type, favorite: req.body.info.favorite, created_at: req.body.info.created_at, status: req.body.info.status, lat: req.body.info.lat, long: req.body.info.long, dateString: req.body.info.dateString});
			new_place.save(function (err, data){
				if(err){
					console.log("We have errors adding the new place: " + req.body.info.status)
				}else{
					console.log("We added the new place!")
					console.log(data)
					User.update({_id: req.body.info.user._id}, { $push: { places: data } }, function(error1, user1) {
						if (error1) {
							console.log("Error updating user's locations")
						} else {
							console.log("Got done with updating user's locations!")
							console.log(user1)
						}
					})
					res.json(data)
				}
			})
		},
		get_all: function(req, res){
			Place.find({visible: "everyone"}, function (err, data){
				if (err){
					console.log("We got an error getting all places")
					res.json({error: err})
				} else {
					console.log("We got all places in places.js")
					console.log(data)
					res.json(data);
				}
			})
		},
		getUserLocations: function(req, res){
			console.log(req.body.info)
			Place.find({_user: req.body.info.userId}, function (error, data){
				if (error) {
					console.log("We got an error getting the current user's places")
					console.log(error)
				} else {
					console.log("We got all the current user's places")
					res.json(data)
				}
			})
		},
		update_one: function(req, res){
			Place.update({_id: req.body.info._id}, {status: req.body.info.status, visible: req.body.info.visible, updated_at: req.body.info.updated_at, lat: req.body.info.lat, long: req.body.info.long, favorite: req.body.info.favorite, type: req.body.info.type}, function(err, place) {
				if(err) {
					console.log("We have some errors to deal with getting the list...")
				} else {
					console.log(place)
					Place.find({}, function (error, places){
						if (error) {
							console.log("Error finding all places")
						} else {
							console.log("Got all places!")
							res.json(places);
						}
					})
				}
			});
		},
		destroy: function(req, res) {
			Place.remove({_id: req.body.current_location._id}, function (err, data) {
				if (err) {
					console.log("We got an error removing the place.")
				} else {
					console.log("We removed a place")
					User.update({_id: req.body.current_location._user}, {$pull: {places: req.body.current_location._id }}, function (error, data1){
						if (error) {
							console.log("There was an error updating the user")
							console.log(error)
						} else {
							console.log("updated the user's places")
						}
					})
					res.json(data)
				}
			});
		}
	}
})();