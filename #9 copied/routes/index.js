var errors = require('./errors');
//var login = require('./login');
var posts = require('./posts');
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');

module.exports = function (app) {

	// home page
	app.get('/', function (req, res) {
		BlogPost.find().sort({ created: -1 }).limit(10).exec(function (err, posts) {
			if (err) return next(err);
			res.render('index', { posts: posts });
		})

	})

	// login and logout handlers
//	login(app);

	// blog post handlers
	posts(app);

	// error handlers
	errors(app);
}
