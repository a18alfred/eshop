const asyncWrapperMiddleware = require('../middlewares/asyncWrapper.middleware');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Address = require('../models/address.model');
const Product = require('../models/product.model');
const CustomError = require('../utils/error.util');

class UserController {
    static get getMe() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {userId} = req.user;
            if (!userId) {
                throw new CustomError({
                    status: 401,
                    message: 'Вы не вошли в свой аккаунт',
                });
            }

            const user = await User.findByPk(userId, {
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: Address,
                        as: 'address',
                    },
                ],
            });

            res.status(200).json({...user.get({plain: true})});
        });
    }

    static get getOrders() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {userId} = req.user;
            let {page, limit, status} = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;

            const options = {
                where: {userId},
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['name', 'price', 'images', 'id'],
                    },
                ],
                order: [['createdAt', 'DESC']],
                limit,
                offset: (page - 1) * limit,
            };

            if (status) {
                options.where.status = status;
            }

            const {count, rows} = await Order.findAndCountAll(options);

            res.status(200).json({
                orders: rows,
                total: count,
                currentPage: page,
                limit,
                totalPages: Math.ceil(count / limit),
            });
        });
    }

    static get changeRole() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {userId} = req.params;
            const {role} = req.body;

            // Check if the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                throw new CustomError({
                    status: 404,
                    message: 'Пользователь не найден',
                });
            }

            // Update the role
            if (role) user.role = role;
            await user.save();

            res.status(200).json({message: 'Роль пользователя успешно изменена'});
        });
    }

    static get updateUser() {
        return asyncWrapperMiddleware(async (req, res) => {
            const {userId} = req.user;
            const {fullName, phone, avatar} = req.body;
            // Check if the user exists
            const user = await User.findByPk(userId);

            if (!user) {
                throw new CustomError({
                    status: 404,
                    message: 'Пользователь не найден',
                });
            }

            // Update the user properties if provided
            if (fullName) {
                user.fullName = fullName;
            }
            if (phone) {
                user.phone = parseInt(phone);
            }
            if (avatar) {
                user.avatar = avatar;
            }

            await user.save();

            res.status(200).json({message: 'Данные пользователя успешно обновлены'});
        });
    }
}

module.exports = UserController;
