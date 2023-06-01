const {Router} = require('express');
const upload = require('../middlewares/upload.middleware');
const verifyToken = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');
const imageProductExist = require('../middlewares/imageProductExist.middleware');
const ImageController = require('../controllers/image.controller');

const router = Router();

router.post('/upload', verifyToken, isAdmin, upload.array('images', 20),
    imageProductExist, ImageController.upload);
router.delete('/delete/:imageId', verifyToken, isAdmin, ImageController.deleteById);

module.exports = router;
