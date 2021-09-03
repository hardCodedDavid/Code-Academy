var mongoose = require('mongoose');
var Schema = mongoose.Schema;

detailSchema = new Schema( {
	unique_id:Number,
	Title: String,
	Description: String,
	Price: String,
	img:String,
	added_date:{
		type: Date,
		default: Date.now
	}
});
Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
