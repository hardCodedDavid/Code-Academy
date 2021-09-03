const User = require('../module/Users.js');
const Admin = require('../module/Admin');
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
const nodemailer = require('nodemailer');



// H A N D L E   E R R O R S
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //incorrect email
   if(err.message === 'incorrect email'){
     errors.email = "this email is incorrect"
   }

   //incorrect password
   if(err.message === 'incorrect password'){
     errors.password = "that password is incorrect"
   }

   //duplicate email code
   if(err.code === 11000){
     errors.email = 'this email already exist';
     return errors;
   }

  // validation handleErrors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach (({ properties }) => {
      errors[ properties.path ] = properties.message;
    });
  }
  return errors;
}

// create JWT
 const maxAge =  12 * 60 * 60 ;
 const createToken = (id) => {
   return jwt.sign({id}, 'this is a secret which must not be public', {
     expiresIn: maxAge
   });
 }

 // create admin JWT
 const adminMaxAge =  1 * 60 * 60 ;
 const createAdminToken = (id) => {
   return jwt.sign({id}, "this is bustaminal's secret key", {
     expiresIn: adminMaxAge
   });
 }




//  ===========  -----  ALL MODULES FOR SIGNUP AND LOGIN PAGE     ------- =========   //


module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { name, address, email, password } = req.body

  try {
    const user = await User.create({ name, address, email, password });
    const token = createToken(user._id);
    res.cookie('myjwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sannidavidsmart@gmail.com',
        pass: 'smartboy001'
      }
    });

    var mailOptions = {
      from: 'sannidavidsmart@gmail.com',
      to: user.email,
      subject: 'Welcome to Bustaminal',
      html: '<h1 style="text-align: center;">Welcome</h1><h2 style="text-align: center;">' + user.name +  '</h2> Bustaminal has been a very kind platform to all it users consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Email successfully sent !!!:" + data.response);
      }
    });
    // console.log({ name, address, email, password });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try{
  const user = await User.login(email, password);
  const token = createToken(user._id);
  res.cookie('myjwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
  res.status(200).json({ user: user._id })
}

  catch(err){
  const errors = handleErrors(err);
    res.status(400).json({ errors });
  };
}


// logout GET request
module.exports.logout_get = (req, res) => {
  res.cookie('myjwt', '', { maxAge: 1 })
  res.redirect('/');
};











// GET: Admin login
module.exports.admin_get = (req, res) => {
       res.render('Admin/Login');
}

// POST: login POST request
module.exports.admin_post = async (req, res) => {
  const { email, password } = req.body

  try{
  const admin = await Admin.login(email, password);
  const token = createAdminToken(admin._id);
  res.cookie('myadminJWT', token, { httpOnly: true, maxAge: adminMaxAge * 1000 })
  res.status(200).json({ admin: admin._id })
  }
  catch(err){
  const errors = handleErrors(err);
    res.status(400).json({ errors });
    console.log(err);
  };
}

// logout GET request
module.exports.logoutAdmin_get = (req, res) => {
  res.cookie('myadminJWT', '', { maxAge: 1 })
  res.redirect('/');
};
