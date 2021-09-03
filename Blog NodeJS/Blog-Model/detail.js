const mongoose = require('mongoose');
const Schema = mongoose.Schema


const blogSchema = new Schema ({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
   },
  author:{
    type: String,
    required: true
  },
  select:{
    type: String,
    required: true
  },
  date_added:{
    type: Date,
		default: Date.now
  }
});

const Blogs = mongoose.model('Blogs', blogSchema)
module.exports = Blogs;
