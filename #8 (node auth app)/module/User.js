const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const{ isEmail } = require('validator');

const userSchema = new mongoose.Schema({
email: {
  type: String,
  required: [true, 'please enter an email address'],
  unique: true,
  lowercase: true,
  validate: [ isEmail, 'please enter a valid email address' ]
},

password: {
  type: String,
  required: [true, 'please enter a password'],
  minlength: [6, 'minimum password is 6 characters']
},
})

//Function will fire before doc. saves in the database
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to login userSchema
userSchema.statics.login = async function(email, password){
  const user = await this.findOne ({ email });
  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth) {
      return user;
    }
    throw Error ('incorrect password');
  }
  throw Error ('incorrect email');
}

const User = mongoose.model('user', userSchema);
module.exports = User;
