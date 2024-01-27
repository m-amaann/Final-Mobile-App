const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/orders', orderController.orders); 
router.get('/getAllOrders', orderController.getAllOrders); 
router.get('/getOrderById/:orderId', orderController.getOrderById);
// router.get('/getMyOrders', authMiddleware, orderController.getOrdersByUserId);

router.put('/updateOrderStatusById/:orderId', orderController.updateOrderStatusById);
router.put('/updateDriverAssignById/:orderId', orderController.updateDriverAssignById); 
router.delete('/deleteOrder/:orderId', orderController.deleteOrder); 

router.get('/delivered/:driverId', orderController.getDeliveredOrdersByDriver);
router.get('/active/:driverId', orderController.getActiveOrdersByDriver);
router.get('/getOrdersByUserId/:userId', orderController.getOrdersByUserId);

router.get('/delivered', orderController.getDeliveredOrders);
router.put('/cancelOrder/:orderId', orderController.cancelOrder);


module.exports = router;
