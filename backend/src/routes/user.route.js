const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = Router();

router.get('/get', verifyToken, UserController.getMe);
router.get('/orders', verifyToken, UserController.getOrders);
router.patch('/role/:userId', verifyToken, isAdmin, UserController.changeRole);
router.patch('/update/:userId', verifyToken, UserController.updateUser);

module.exports = router;
