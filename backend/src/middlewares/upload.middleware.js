const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.join(__dirname, '/../assets/'));
    },
    filename: function (_req, file, cb) {
        const filename = uuidv4() + path.extname(file.originalname);
        cb(null, filename);
    },
});

function fileFilter(_req, file, cb) {
    const filetype = file.mimetype.split('/');
    if (filetype[0] === 'image') {
        cb(null, true);
    } else {
        const error = new Error(
            'Файл не является изображением. Пожалуйста, попробуйте еще раз!'
        );
        error.statusCode = 400;
        return cb(error, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter,
});

module.exports = upload;