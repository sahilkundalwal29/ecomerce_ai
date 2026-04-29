const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.get('/', auth, orderController.getUserOrders);
router.post('/', auth, orderController.createOrder);
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;
