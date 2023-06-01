const asyncWrapper = require('../middlewares/asyncWrapper.middleware');
const Order = require('../models/order.model');
const CustomError = require('../utils/error.util');
const Product = require('../models/product.model');
const User = require('../models/user.model');

class OrderController {
    static get createOrder() {
        return asyncWrapper(async (req, res) => {
            const {productId, quantity, totalPrice, shippingPrice} = req.body;
            const {userId} = req.user;

            // Verify that the user exists
            const user = await User.findByPk(userId, {
                include: [{model: Address, as: 'address'}],
            });
            if (!user) {
                throw new CustomError({
                    status: 404,
                    message: 'Пользователь не найден',
                });
            }

            // Check if the user has an address
            if (!user.address) {
                throw new CustomError({
                    status: 400,
                    message: 'У пользователя отсутствует адрес',
                });
            }

            // Find the product by ID
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new CustomError({
                    status: 404,
                    message: 'Товар не найден',
                });
            }

            if (!(productId && quantity && totalPrice && shippingPrice)) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите всю информацию',
                });
            }

            // Check if the product quantity in stock is sufficient
            if (quantity > product.stock) {
                throw new CustomError({
                    status: 400,
                    message: 'Недостаточное количество товара в наличии',
                });
            }

            // Create the order
            const order = await Order.create({
                userId,
                productId,
                quantity,
                totalPrice,
                shippingPrice,
                status: 'Заказ создан',
            });

            // Subtract the ordered quantity from the product stock
            product.stock -= quantity;
            product.sold += quantity;
            await product.save();

            res.status(201).json({
                message: 'Заказ успешно создан',
                order,
            });
        });
    }

    static get updateOrder() {
        return asyncWrapper(async (req, res) => {
            const {orderId} = req.params;
            const {status, isPaid} = req.body;
            const order = await Order.findByPk(orderId);

            if (!order) {
                throw new CustomError({
                    status: 404,
                    message: 'Заказ не найден',
                });
            }

            if (status === 'Отменён') {
                // Bring back the ordered quantity to the product stock
                const product = await Product.findByPk(order.productId);
                if (!product) {
                    throw new CustomError({
                        status: 404,
                        message: 'Товар не найден',
                    });
                }

                product.stock += order.quantity;
                product.sold -= order.quantity;
                await product.save();
            }

            order.status = status;

            if (status === 'Доставлен') {
                order.deliveredAt = new Date();
            }

            if (isPaid !== undefined) {
                order.isPaid = isPaid;
                if (isPaid) {
                    order.paidAt = new Date();
                } else {
                    order.paidAt = null;
                }
            }

            await order.save();

            res.status(200).json({
                message: 'Заказ успешно изменён',
                order,
            });
        });
    }


    static get cancelOrder() {
        return asyncWrapper(async (req, res) => {
            const {orderId} = req.params;

            // Find the order by its ID
            const order = await Order.findByPk(orderId);

            if (!order) {
                throw new CustomError({
                    status: 404,
                    message: 'Заказ не найден',
                });
            }

            // Allow canceling the order only if the status is "Заказ создан"
            if (order.status !== 'Заказ создан') {
                throw new CustomError({
                    status: 400,
                    message: 'Заказ не может быть отменён',
                });
            }

            // Check if the user is the owner of the order or an admin
            if (order.userId !== req.user.userId) {
                throw new CustomError({
                    status: 403,
                    message: 'У вас нет прав на данную операцию',
                });
            }

            // Bring back the ordered quantity to the product stock
            const product = await Product.findByPk(order.productId);
            if (!product) {
                throw new CustomError({
                    status: 404,
                    message: 'Товар не найден',
                });
            }

            product.stock += order.quantity;
            product.sold -= order.quantity;
            await product.save();

            // Cancel the order
            order.status = 'Отменён';
            await order.save();

            res.status(200).json({
                message: 'Заказ успешно отменён',
                order,
            });
        });
    }

    static get getAllOrders() {
        return asyncWrapper(async (req, res) => {
            let {page, limit, status} = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;

            // Prepare the filter object based on the status parameter
            const filter = {};
            if (status) {
                filter.status = status;
            }

            // Find all orders with pagination and optional status filter
            const {count, rows} = await Order.findAndCountAll({
                offset,
                limit,
                where: filter, // Apply the filter object
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price'],
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email'],
                    },
                ],
            });

            res.status(200).json({
                orders: rows,
                total: count,
                currentPage: page,
                limit,
                totalPages: Math.ceil(count / limit),
            });
        });
    }
}

module.exports = OrderController;