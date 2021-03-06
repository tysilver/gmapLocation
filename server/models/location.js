var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new mongoose.Schema({
	status: String,
	created_at: Date,
	updated_at: Date,
	visible: String,
	lat: Number,
	long: Number,
	dateString: String,
	favorite: Boolean,
	type: String,
	_user: {type: Schema.ObjectId, ref: 'User'}
});

mongoose.model('Place', PlaceSchema);