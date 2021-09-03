//  npm i admin-bro admin-bro-expressjs admin-bro-mongoose express mongoose  bcrypt cookie-parser ejs express express-formidable express-session jsonwebtoken nodemailer validator connect-mongo dotenv morgan stripe

require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cartRoute = require('./routes/cartRoute');
const adminRoutes = require("./routes/adminRoutes");
const checkoutRoute = require("./routes/checkoutRoute");
const logger = require("morgan");
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const session = require("express-session");
const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");
const Cart = require("./models/cart");
var MongoStore = require("connect-mongo")(session);
const bodyParser = require('body-parser');
const connectDB = require("./config/db");
const nodemailer = require('nodemailer');
const app = express();


// mongodb configuration
connectDB();

// Mongodb connect
// const dbURI = process.env.MONGODB_URI
// mongoose.connect(dbURI,  { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, })
//  .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err + "MongoDB Not Connected: Error!!!"))

// view engine setup
app.set("view engine", "ejs");

app.use(bodyParser.json())

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    //session expires after 3 hours
    cookie: { maxAge: 60 * 1000 * 60 * 3 },
  })
);


// Global Variable Across routes
app.use( (req, res, next) => {
  try {
    res.locals.session = req.session;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});



//============ GET:   R O U T E S   =========//

app.get('*', checkUser )
app.use(authRoutes);
app.use(cartRoute);
app.use(checkoutRoute)
// admin route

app.use(adminRoutes);

app.get('/', (req, res) => {
  Product.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { products: result })
    })
    .catch((err) => {
      res.render('Errors/404')
      console.log(err);
    })
})

app.get('/dashboard', requireAuth, async (req, res) => {
   try {
      // find all orders of this user
      allOrders = await Order.find({ user: req.user });
      res.render("dashboard", {
        orders: allOrders,
      });
    } catch (err) {
      console.log(err);
      res.render('Errors/404');
    }
})



app.get('/user/edit', (req, res) => {
  res.render('edit-user')
})



app.post('/edit-user/:id', (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const data = User.findByIdAndUpdate(id, product)
    .then((result) => {
       res.redirect('/dashboard')
       console.log(result);
    })
    .catch((err) => {
       res.render('Errors/404')
       console.log(err);
   })
})




app.get('/products/:id', async (req, res) => {
 try {
   const product = await Product.findById(req.params.id)
   res.render("details", {
     pageName: product.title,
     product,
   });
 } catch (error) {
   console.log(error);
   res.render('Errors/404')
 }
})


app.get('/store', (req, res) => {
  Product.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('store', { products: result })
    })
    .catch((err) => {
      res.render('Errors/404')
      console.log(err);
    })
});



app.get('*', (req, res) => {
  res.render('Errors/404');
})






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


const port = process.env.PORT || 8000;
app.listen(port,() => {
  console.log("Server running on port " + port);
});
