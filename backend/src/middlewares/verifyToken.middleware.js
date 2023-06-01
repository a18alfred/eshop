const {verifyTokenJWT} = require('../utils/jwt.util');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const accessToken = token.split(' ')[1];

        try {
            const decoded = verifyTokenJWT(
                accessToken,
                process.env.SECRET_KEY_ACCESS_TOKEN
            );
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).json({message: 'Access token недействителен.'});
        }
    } else {
        res.status(401).json({message: 'Вы не вошли в свой аккаунт.'});
    }
};

module.exports = verifyToken;
