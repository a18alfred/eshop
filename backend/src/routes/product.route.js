const {Router} = require('express');
const ProductController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = Router();

router.get('/get', ProductController.getProduct);
router.get('/get/:productCode', ProductController.getProductByCode);
router.post('/create', verifyToken, isAdmin, ProductController.createProduct);
router.patch('/update/:productId', verifyToken, isAdmin, ProductController.updateProduct);
router.delete('/delete/:productId', verifyToken, isAdmin, ProductController.deleteProduct);

module.exports = router;
