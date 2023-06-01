const {Router} = require('express');
const AddressController = require('../controllers/address.controller');
const verifyToken = require('../middlewares/verifyToken.middleware');
const router = Router();

router.post('/create', verifyToken, AddressController.createAddress);
router.put('/update', verifyToken, AddressController.updateAddress);

module.exports = router;