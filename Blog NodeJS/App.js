const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const Blogs = require('./Blog-Model/detail.js');


// database
const dbURI = 'mongodb+srv://Smart:smartboy@cluster0.quoin.mongodb.net/Simple-Blog?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true,  useUnifiedTopology: true } );

// views
app.set('view engine', 'ejs');

// public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// -------======= R O U T E S ======---------//
// -------======= GET Request ======---------//
app.get('/', (req, res) => {
  Blogs.find().sort({ date_added: -1 })
  .then((result) => {
  res.render('index', { posts: result })
  })
  .catch((err) => {
    console.log(err);
  })
});

app.get('/create', (req, res) => {
  res.render('create')
});

app.get('/blog/:id', (req, res) => {
  const id = req.params.id
  Blogs.findById(id)
  .then((result) => {
    res.render('blogDetail', { post: result })
  })
});

// -------======= POST Request ======---------//
app.post('/', (req, res) => {
  const blog = new Blogs(req.body)
  blog.save()
  .then((result) => {
    res.redirect('/')
    console.log(req.body.title +" "+ "is Successful");
  })
  .catch((err) => {
    console.log(err);
  })
})


// -------======= DELETE Request ======---------//

app.post('/delete', (req, res) => {
    const id = req.body.Delete
    Blogs.findByIdAndRemove(id)
    .then(result => {
        res.redirect('/');
        console.log(req.body + " " + "was deleted successfully");
    })
    .catch(err => {
        console.log(err)
    })
})


const port = 4000;
app.listen(port, () => { console.log('listening on port' +" "+ port); });
