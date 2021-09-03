const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth } = require('./middleware/authMiddleware');


// data base

const dbURI = 'mongodb+srv://Smart:smartboy@cluster0.quoin.mongodb.net/auth-app?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true,  useUnifiedTopology: true } );

// Views

app.set('view engine', 'ejs');

// Public
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

// Routers

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/recipes',  requireAuth, (req, res) => {
  res.render('main')
});
// cookies
// set cookies
app.get('/set-cookies', (req, res) => {
   res.cookie('newUser', false);
   res.cookie('isEmlopyee', true, { maxAge: 1000 * 60 * 60 * 24 });
});

// read cookies
app.get('/read-cookie', (req, res) => {
  const cookies = req.cookies
  console.log(cookies)

  res.json(cookies);
});


var port = 3000;
app.listen(port, () => { console.log('app is listening on port ' + port);});
