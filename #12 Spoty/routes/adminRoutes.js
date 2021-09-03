const { Router } = require('express');
const router = Router();
const Product = require("../models/Product");
const Cart = require("../models/cart");
const User = require("../models/User");
const { requireAdminAuth, checkAdmin } = require('../middleware/adminMiddleware');



router.get('/admin-dashboard', requireAdminAuth, checkAdmin, (req, res) => {
    res.render("Admin/admin")
})


router.get('/admin-dashboard/users', requireAdminAuth, (req, res) => {
    User.find().sort({ createdAt: -1 })
      .then((result) => {
          res.render("Admin/Users", { adminUsers: result })
      })
      .catch((err) => {
        res.render('Errors/404')
        console.log(err);
      })
})


router.get('/admin-dashboard/products', requireAdminAuth, (req, res) => {
  Product.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render("Admin/Product", { products: result })
    })
    .catch((err) => {
      res.render('Errors/404')
      console.log(err);
    })
})

// GET: Add to the products

router.get('/admin-dashboard/products/add-products', requireAdminAuth, (req, res) => {
  //random values
  const random = Math.floor(Math.random() * 1000000000000000000 + 1 )
  res.render('Admin/add-product', { number: random });
});




// GET: Edit the products
router.get('/admin-dashboard/products/edit-products/:id', requireAdminAuth, (req, res) => {
  const id = req.params.id
  Product.findById(id)
  .then((result) => {
    res.render('Admin/edit-product', { productDetails: result });
    })
  .catch((err) => {
    res.render('Errors/404')
    console.log(err);
  })
});




// GET: View the product details from dashboard

router.get('/admin-dashboard/products/details/:id', requireAdminAuth, (req, res) => {
const id = req.params.id
Product.findById(id)
.then((result) => {
  res.render('Admin/adminProductDetails', { productDetails: result });
  })
.catch((err) => {
  res.render('Errors/404')
  console.log(err);
})
});



// GET: View the users details from dashboard

router.get('/admin-dashboard/user/details/:id', requireAdminAuth, (req, res) => {
const id = req.params.id
User.findById(id)
.then((result) => {
  res.render('Admin/adminDetails', { userDetails: result });
  })
.catch((err) => {
  res.render('Errors/404')
  console.log(err);
})
});


// ===== POST: Add product to the product list

router.post('/add-product', requireAdminAuth, (req, res) => {
  const product = new Product (req.body)
  product.save()
  .then((result) => {
    res.redirect('/admin-dashboard/products')
  })
  .catch((err) => {
    res.render('Errors/404')
    console.log(err);
  })
})


// ===== POST: Edit product from the product list

router.post('/edit-product/:id', requireAdminAuth, async (req, res) => {
  const id = req.params.id;
const product = req.body;

const data = Product.findByIdAndUpdate(id, product)
  .then((result) => {
    res.redirect('/admin-dashboard/products')
    console.log(result);
  })
  .catch((err) => {
    res.render('Errors/404')
    console.log(err);
  })
})


// ===== POST: Delete product from the product list

router.post('/delete-product', requireAdminAuth, (req, res) => {
  const id = req.body.Delete
  const body = req.body
    Product.findByIdAndRemove(id)
    .then(result => {
            res.redirect('/admin-dashboard/products');
            console.log(body);
        })
        .catch(err => {
            console.log(err)
        })
});






module.exports = router;
