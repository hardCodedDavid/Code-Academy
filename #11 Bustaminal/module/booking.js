const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingSchema = new Schema({

Departure: {
  type: String,
  required: true
},
Arrival: {
  type: String,
  required: true
},
Station: {
  type: String,
  required: true
},
Date: {
  type: String,
  required: true
},
Address: {
  type: String,
  required: true
},
Price: {
  type: String,
  required: true
},
userId: {
  type: String,
},
userName: {
  type: String,
},
userAddress: {
  type: String,
},
userEmail: {
  type: String,
},
date_added: {
  type: Date,
  default: Date.now
}

});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
