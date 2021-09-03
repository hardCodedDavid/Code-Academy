// Product
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Product = require('./models/schema.js');
app.listen(3030);

// middle ware
app.use(express.urlencoded ({extended: true}));
app.use(morgan('dev'));

// data base
const dbURI = 'mongodb+srv://Smart:smartboy@cluster0.quoin.mongodb.net/node-app?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true,  useUnifiedTopology: true } );
// EJS files
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/product')
})
  app.get('/add-product', (req, res) => {
  res.render('add');
 })

// static files
app.use(express.static('public'));

// Schemas & svaing data

app.get('/product', (req, res) => {
    Product.find().sort( { createdAt: -1 } )
    .then((result) => {
        res.render('index', { product: result })
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/product/single', (req, res) => {
    Product.findById()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
})

// Post request
app.post(('/product'), (req, res) => {
    const product = new Product(req.body);

    product.save()
    .then((resut) => {
        res.redirect('/product');
    })
    .catch((err) => {
        console.log(err)
    })
})

// delete data
app.delete('/product/:id', (req, res) => {
    const id = req.params.id

    Product.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/product' })
    })
    .catch(err => {
        console.log(err)
    })
})
