const Product = require('../models/product.model');
const path = require('path');
const fs = require('fs');

const imageProductExist = async (req, res, next) => {
    const productId = req.body.productId;

    if (!req.files || !productId) {
        return res.status(400).json({message: 'Файлы или projectId отсутствуют.'});
    }

    const url = `${req.protocol}://${req.get('host')}`;
    const images = req.files.map((file) => {
        return {src: url + '/assets/' + file.filename, alt: 'product', productId};
    });

    const product = await Product.findByPk(productId);

    if (!product) {
        images.forEach((image) => {
            fs.unlinkSync(path.join(__dirname, '/../assets/', path.basename(image.src)));
        });

        return res.status(400).json({message: 'Товар не найден.'});
    }

    req.uploadedImages = images
    req.product = product
    next();
};

module.exports = imageProductExist;