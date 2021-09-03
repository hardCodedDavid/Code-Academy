const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.adminJWT;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.ADMINJWT_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect('/@dmin/Entry/authenticate/425263QwA1IWH9/Login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/@dmin/Entry/authenticate/425263QwA1IWH9/Login');
  }
};

// check current user
const checkAdmin = (req, res, next) => {
  const token = req.cookies.adminJWT;
  if (token) {
    jwt.verify(token, process.env.ADMINJWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.admin = null;
        next();
      } else {
        let admin = await Admin.findById(decodedToken.id);
        res.locals.admin = admin;
        next();
      }
    });
  } else {
    res.locals.admin = null;
    next();
  }
};


module.exports = { requireAdminAuth, checkAdmin };
