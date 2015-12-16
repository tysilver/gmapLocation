var mongoose = require('mongoose');
var Place = mongoose.model('Place');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		get_all: function(req, res){
			Place.find({}, function (err, data){
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
		add: function (req, res){
			var new_place = new Place({_user: req.body.info.user._id, created_at: req.body.info.created_at, status: req.body.info.status, lat: req.body.info.lat, long: req.body.info.long, dateString: req.body.info.dateString});
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
		}
	}
})();