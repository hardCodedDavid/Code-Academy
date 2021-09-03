const { Router } = require('express');
const router = Router();
const authController = require('../controller/authController');
// const { requireAuth, checkUser } = require('../middleware/authMiddleware');

router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/@dmin/Entry/authenticate/425263QwA1IWH9/Login', authController.admin_get);

router.post('/admin/login', authController.admin_post);


module.exports = router;
