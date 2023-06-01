const {Router} = require('express');
const router = Router();

router.use('/api/product', require('./product.route'));
router.use('/api/category', require('./category.route'));
router.use('/api/image', require('./image.route'));
router.use('/api/auth', require('./auth.route'));
router.use('/api/user', require('./user.route'));
router.use('/api/address', require('./address.route'));
router.use('/api/comment', require('./comment.route'));
router.use('/api/order', require('./order.route'));

module.exports = router;
