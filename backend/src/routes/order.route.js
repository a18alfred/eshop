const {Router} = require('express');
const OrderController = require('../controllers/order.controller')
const verifyToken = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware')

const router = Router();

router.post('/create', verifyToken, OrderController.createOrder)
router.patch('/update/:orderId', verifyToken, isAdmin, OrderController.updateOrder)
router.patch('/cancel/:orderId', verifyToken, OrderController.cancelOrder)
router.patch('/get', verifyToken, isAdmin, OrderController.getAllOrders)

module.exports = router;