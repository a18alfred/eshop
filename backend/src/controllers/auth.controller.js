const CustomError = require('../utils/error.util');
const asyncWrapperMiddleware = require('../middlewares/asyncWrapper.middleware');
const bcrypt = require('bcryptjs');
const sendMail = require('../utils/sendMail.util');
const crypto = require('crypto');
const {Op} = require('sequelize');
const {generateTokenJWT, verifyTokenJWT} = require('../utils/jwt.util');
const User = require('../models/user.model');
require('dotenv').config();

const accessTokenSecret = process.env.SECRET_KEY_ACCESS_TOKEN;
const accessTokenExpiresIn = '1d';
const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN;
const refreshTokenExpiresIn = '30d';

class AuthController {
    static get signUp() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {fullName, phone, email, password} = req.body;

            if (!(fullName || phone || email || password)) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите всю информацию.',
                });
            }

            const existAccount = await User.findOne({
                where: {
                    email,
                },
            });

            if (existAccount) {
                throw new CustomError({
                    status: 400,
                    message: 'Этот адрес уже зарегистрирован.',
                });
            }

            await User.create(req.body);

            res.status(201).json({
                message: 'Успешная регистрация аккаунта!',
            });
        });
    }

    static get signIn() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {email, password} = req.body;

            if (!(email || password)) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите всю информацию.',
                });
            }

            const user = await User.findOne({
                where: {
                    email,
                },
                attributes: ['id', 'email', 'password', 'role'],
            });

            if (!user) {
                throw new CustomError({
                    status: 400,
                    message: 'Электронная почта или пароль недействительны',
                });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                throw new CustomError({
                    status: 400,
                    message: 'Электронная почта или пароль недействительны',
                });
            }

            const payload = {
                userId: user.id,
                role: user.role,
            };

            const accessToken = generateTokenJWT(
                payload,
                accessTokenSecret,
                accessTokenExpiresIn
            );

            const refreshToken = generateTokenJWT(
                payload,
                refreshTokenSecret,
                refreshTokenExpiresIn
            );

            const date = new Date(Date.now());
            date.setDate(date.getDate() + 1);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Lax',
                expires: date,
            });

            res.status(200).json({
                message: 'Вы успешно вошли!',
                accessToken,
            });
        });
    }

    static get refreshToken() {
        return asyncWrapperMiddleware(async (req, res) => {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throw new CustomError({
                    status: 401,
                    message: 'Вы не вошли в свой аккаунт.',
                });
            }

            const decoded = verifyTokenJWT(refreshToken, refreshTokenSecret);

            const {iat, exp, ...payloadUser} = decoded;

            const newAccessToken = generateTokenJWT(
                payloadUser,
                accessTokenSecret,
                accessTokenExpiresIn
            );
            const newRefreshToken = generateTokenJWT(
                payloadUser,
                refreshTokenSecret,
                refreshTokenExpiresIn
            );

            const date = new Date(Date.now());
            date.setDate(date.getDate() + 1);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                expires: date,
            });

            res.status(200).json({
                message: 'Успешно получен новый access token.',
                accessToken: newAccessToken,
            });
        });
    }

    static get signOut() {
        return asyncWrapperMiddleware(async (req, res) => {
            res.clearCookie('refreshToken');
            res.status(200).json({
                message: 'Вы успешно вышли.',
            });
        });
    }

    static get forgotPassword() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {email} = req.body;
            const user = await User.findOne({
                where: {
                    email,
                },
                attributes: [
                    'id',
                    'fullName',
                    'email',
                    'passwordToken',
                    'passwordTokenExpirationDate',
                ],
            });

            if (!user) {
                throw new CustomError({
                    status: 404,
                    message: 'Аккаунт не найден!',
                });
            }

            const token = crypto.randomBytes(32).toString('hex');
            const verifyLink = `${process.env.ORIGIN_CLIENT}/reset-password?email=${user.email}&token=${token}`;

            user.id = user.id;
            user.passwordToken = crypto
                .createHash('sha256')
                .update(token)
                .digest('hex');
            const tenMinutes = 1000 * 60 * 30;
            user.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
            await user.save();

            await sendMail({
                to: user.email,
                subject: 'Сбросить пароль учетной записи',
                fullName: user.fullName,
                origin_client: process.env.ORIGIN_CLIENT,
                verifyLink,
            }).catch((error) => console.log(error));

            res.status(200).json({
                message: 'Почта для смены пароля успешно отправлена!',
            });
        });
    }

    static get verifyRecovery() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {email, token} = req.body;

            if (!(email || token)) {
                throw new CustomError({
                    status: 400,
                    message: 'Ссылка недействительна или срок ее действия истек',
                });
            }

            const user = await User.findOne({
                where: {
                    email,
                    passwordToken: crypto
                        .createHash('sha256')
                        .update(token)
                        .digest('hex'),
                    passwordTokenExpirationDate: {
                        [Op.gt]: new Date(Date.now()),
                    },
                },
                attributes: ['id'],
            });

            if (!user) {
                throw new CustomError({
                    status: 400,
                    message: 'Ссылка недействительна или срок ее действия истек',
                });
            }

            res.status(200).json({
                message: 'Успешная проверка токена восстановления пароля',
            });
        });
    }

    static get resetPassword() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {token, email, password} = req.body;
            if (!(token || email || password)) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите всю информацию',
                });
            }

            const user = await User.findOne({
                where: {
                    email,
                    passwordToken: crypto
                        .createHash('sha256')
                        .update(token)
                        .digest('hex'),
                    passwordTokenExpirationDate: {
                        [Op.gt]: new Date(Date.now()),
                    },
                },
                attributes: [
                    'id',
                    'password',
                    'passwordToken',
                    'passwordTokenExpirationDate',
                ],
            });

            console.log(user)

            if (!user) {
                throw new CustomError({
                    status: 400,
                    message: 'Ссылка недействительна или срок ее действия истек',
                });
            }
            user.id = user.id;
            user.password = password;
            user.passwordToken = null;
            user.passwordTokenExpirationDate = null;
            await user.save();

            res.status(200).json({
                message: 'Пароль изменён успешно.',
            });
        });
    }
}

module.exports = AuthController;
