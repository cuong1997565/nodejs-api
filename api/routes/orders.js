const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrderController = require("../controllers/orders");

//list order
router.get('/',checkAuth,OrderController.orders_get_all);
//create order
router.post('/',checkAuth, OrderController.orders_create_order);
//edit order 
router.get('/:orderId',checkAuth, OrderController.orders_edit_order);
//delete order
router.delete('/:orderId',checkAuth,OrderController.orders_delete_order);

module.exports = router;
