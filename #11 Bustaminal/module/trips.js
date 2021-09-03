const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  From: {
    type: String,
    required: true
  },
  Destination: {
    type: String,
    required: true
  },
  Station: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Date: {
    type: String,
    required: true
  },
  // Time: {
  //   type: String,
  //   required: true
  // },
  Price: {
    type: String,
    required: true
  },
  added_date: {
    type: Date,
    default: Date.now
  }

});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip
