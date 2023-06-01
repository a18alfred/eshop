const {Router} = require('express');
const CategoryController = require('../controllers/category.controller');
const verifyToken = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware')

const router = Router();

router.get('/get', CategoryController.getCategory);
router.post('/create', verifyToken, isAdmin, CategoryController.createCategory);
router.delete('/delete/:categoryId', verifyToken, isAdmin, CategoryController.deleteCategory);

module.exports = router;
