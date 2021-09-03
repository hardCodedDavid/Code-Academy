const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;
  //check jwt exit and verify

  if(token){
    jwt.verify(token, 'this is a secret which must not be public', (err, decodedToken) => {
      if(err){
        console.log(err.message);
        res.redirect('/login');
      } else {
    console.log(decodedToken);
        next();
      }
    })
  } else {
    res.redirect('/login');
  }
}

module.exports = { requireAuth };
