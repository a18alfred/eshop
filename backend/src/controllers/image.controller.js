const asyncWrapper = require('../middlewares/asyncWrapper.middleware');
const Image = require('../models/image.model');
const CustomError = require('../utils/error.util');
const path = require('path');
const fs = require('fs');

class ImageController {
    static get upload() {
        return asyncWrapper(async (req, res) => {
            const createdImages = await Image.bulkCreate(req.uploadedImages);

            res.status(201).json({
                message: 'Фото загружено успешно и связано с товаром.',
                images: createdImages,
            });
        });
    }

    static get deleteById() {
        return asyncWrapper(async (req, res) => {
            const imageId = req.params.imageId;

            const image = await Image.findByPk(imageId);

            if (!image) {
                throw new CustomError({
                    message: 'Изображение не найдено.',
                    status: 404,
                });
            }

            // Delete the image file from the storage
            fs.unlinkSync(path.join(__dirname, '/../assets/', path.basename(image.src)));

            // Delete the image from the database
            await image.destroy();

            res.status(200).json({message: 'Изображение успешно удалено.'});
        });
    }
}

module.exports = ImageController;
