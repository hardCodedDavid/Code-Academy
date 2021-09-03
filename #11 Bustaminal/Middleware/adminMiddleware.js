const jwt = require('jsonwebtoken');
const Admin = require('../module/Admin');

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.myadminJWT;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "this is bustaminal's secret key", (err, decodedToken) => {
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
  const token = req.cookies.myadminJWT;
  if (token) {
    jwt.verify(token, "this is bustaminal's secret key", async (err, decodedToken) => {
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
