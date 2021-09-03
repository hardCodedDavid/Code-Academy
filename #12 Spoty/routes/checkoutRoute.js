const { Router } = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const paypal = require('paypal-rest-sdk');
const Product = require("../models/Product");
const Cart = require("../models/cart");
const Order = require("../models/Order");

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AYZCxOCpBhlM-Yo8tBFdUYwUh0GcxDWYPVeO9wg3oQFTvt7yxdWAL4Jj9sDIPmrMbNPXS-oIUCeRlSmX',
  'client_secret': 'EIxOLMdhV0PSg0dZsI_wvXl3XGeOIw5-eQJt6VavBrUrJQWOk1dHtEdAIiTIbz3KqfZxKzpiazQeAlcu'
});

const router = Router();

// router.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

router.post('/pay', requireAuth, (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/dashboard/order",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": req.session.cart.totalCost,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": req.session.cart.totalCost
        },
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
          console.log("Payment in Progress");
        }
      }
  }
});

});



router.get('/dashboard/order', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": req.session.cart.totalCost
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));

          const cart =  Cart.findById(req.session.cart._id);
        const order = new Order({
        user: req.user,
        cart: {
          totalQty: cart.totalQty,
          totalCost: cart.totalCost,
          items: cart.items,
        },
        address: req.body.address,
        // paymentId: charge.id,
      });
      order.save(async (err, newOrder) => {
        if (err) {
          console.log(err);
          return res.redirect("/shopping-cart");
        }
        // await Cart.findById(req.session.cart._id).save();
        await Cart.findByIdAndDelete(cart._id);
        req.session.cart = null;
        res.redirect("/dashboard");
      });

    }
});
});


router.get('/cancel', (req, res) =>{
   res.redirect('/shopping-cart')
 });



// https://developer.paypal.com/developer/applications/edit/SB:QVZ2cXE4U0s5ZDZ2RGlGSktTdEZldVlwdE16eXEtZmJTMUZQeFAwb0c5RFQtU0p2Xzc0VkFEd1owWEg1S01Cd2t3M19JZHRaOGhoUlNpMmo=?appname=Spoty



module.exports = router;
