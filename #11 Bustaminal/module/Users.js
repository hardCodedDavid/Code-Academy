const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
 name: {
   type: String,
   required: true
 },
 address: {
   type: String,
   required: true
  },
 email: {
   type: String,
   required: [true, "please enter an email"],
   unique: true,
   lowercase: true,
   validate: [ isEmail, " please enter a valid email " ]
 },
 password: {
   type: String,
   required: [true, "please enter a password"],
   minlength: [8, "minimum password is 8 characters"],
 }

})
//This function will fire before doc. saves in the database

userSchema.pre ('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
    next();
})

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

const User = mongoose.model('user', userSchema)
module.exports = User ;
