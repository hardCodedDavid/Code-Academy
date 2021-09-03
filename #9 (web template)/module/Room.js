const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  subject: {
    type: String,
    require: true
  },
  topic: {
    type: String,
    require: true
  },
  note: {
    type: String,
    require: true
  },
  comment: {
    type: String,
    require: true
  },
  added_date:{
    type: Date,
    default: Date.now
  }
});
const Room = mongoose.model('Room', roomSchema)
module.exports = Room
