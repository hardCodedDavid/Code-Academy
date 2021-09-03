const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema ({
  subject: {
    type: String,
    require: true
  },
  note: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject
