var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: String,
	created_at: Date,
	places: [{type: Schema.Types.ObjectId, ref: 'Place'}]
});

mongoose.model('User', UserSchema);