const {Router} = require('express');
const CommentController = require('../controllers/comment.controller')
const verifyToken = require('../middlewares/verifyToken.middleware');

const router = Router();

router.post('/create', verifyToken, CommentController.createComment)
router.delete('/delete/:commentId', verifyToken, CommentController.createComment)
router.get('/byproduct/:productId', CommentController.getCommentsByProduct)

module.exports = router;
