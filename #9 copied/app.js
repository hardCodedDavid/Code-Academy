var mongoose = require('mongoose');
var express = require('express');
var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');



// add mongoose query and promise support to express
//require('express-mongoose');

//var user = require('./models/user');
var blogpost = require('./models/blogpost');
var comment = require('./models/comment');
var routes = require('./routes');

//mongoose.set('debug', true);
// data base
const dbURI = 'mongodb+srv://Smart:smartboy@cluster0.quoin.mongodb.net/node-app?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true,  useUnifiedTopology: true }, function (err) {
	if (err) throw err;
	console.log('connected!');

	var app = express();

	// middleware
	//app.use(logger("dev"));
	// there should be used connect-mongo or similar
	// for persistant sessions
	app.use(cookieParser());
	app.use(session({ secret: 'building a blog' }));
	app.use(bodyParser());
	// expose session to views
	app.use(function (req, res, next) {
		res.locals.session = req.session;
		next();
	})
	// View engine
	app.set('view engine', 'ejs');
	app.use(express.static('public'));

	routes(app);

	app.listen(3000, function () {
		console.log('now listening on port 3000');
	})
})
