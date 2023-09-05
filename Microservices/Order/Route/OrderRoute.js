const express = require('express');
const orderController = require('../Controller/OrderController'); 

const router = express.Router();

// Define routes
router.get('/orders', orderController.getOrderDetails);
router.get('/orders/:orderId', orderController.getOrderDetailsById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;