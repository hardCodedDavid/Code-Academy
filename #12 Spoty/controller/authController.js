const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
const nodemailer = require('nodemailer');

// handle Errors
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

// validation Errors
if(err.message.includes('user validation failed')){
  Object.values(err.errors).forEach(({ properties }) => {
    errors[ properties.path ] = properties.message;
  });
}

return errors;
}

// create JWT
 const maxAge =  12 * 60 * 60 ;
 const createToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
     expiresIn: maxAge
   });
 }

 // create admin JWT
  const adminMaxAge =  1 * 60 * 60 ;
  const createAdminToken = (id) => {
    return jwt.sign({id}, process.env.ADMINJWT_SECRET_KEY, {
      expiresIn: adminMaxAge
    });
  }


//  ===========  -----  ALL MODULES FOR SIGNUP AND LOGIN PAGE     ------- =========   //



// signup GET request
module.exports.signup_get = (req, res) => {
       res.render('signup');
}

// signup POST request
module.exports.signup_post = async (req, res) => {
const { email, password, firstName, lastName, country } = req.body;

try{
 const user = await User.create ({ firstName, lastName, country, email, password });
 const token = createToken(user._id);
res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
res.status(201).json({ user: user._id });

// Send an email to the newly signed-up user

var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    var mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Spoty Online Shopping',
      html:'<div style="background-color: #fff;"><div style="background-color: rgba(55, 65, 81);magin: 20px;padding: 20px;border-radius: 5px;color: #ddd; --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.8);box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"><h3 style="font-weight: 500; font-size: 1.5rem;">Congratulations!!!</h3><h4  style="font-weight: 400; font-size: 1rem;">You have just Joined the <b style="color: rgba(245, 158, 11);">SPOTY</b> Online Shopping Platform</h4><p  style="font-weight: 200;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><a href="#"  style="background-color: rgba(245, 158, 11); padding: 10px; border-radius: 5px; color: #fff;">Shop Now</a></div></div>'
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Email successfully sent !!!:" + data.response);
      }
      });

}
catch(err){
const errors = handleErrors(err);
  res.status(400).json({ errors });
}

}



// login GET request
module.exports.login_get = (req, res) => {
res.render('login');
};


// login POST request
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try{
  const user = await User.login(email, password);
  const token = createToken(user._id);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
  res.status(200).json({ user: user._id })
  }
  catch(err){
  const errors = handleErrors(err);
    res.status(400).json({ errors });
  };
}

// logout GET request
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
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
  res.cookie('adminJWT', token, { httpOnly: true, maxAge: adminMaxAge * 1000 })
  res.status(200).json({ admin: admin._id })
  }
  catch(err){
  const errors = handleErrors(err);
    res.status(400).json({ errors });
    console.log(err);
  };
}
