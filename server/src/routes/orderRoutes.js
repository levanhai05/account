const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { create, myOrders } = require('../controllers/orderController');


router.post('/', auth, create);
router.get('/me', auth, myOrders);


module.exports = router;