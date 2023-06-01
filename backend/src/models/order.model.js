const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db.config');
const Product = require('./product.model');
const User = require('./user.model');

const Order = sequelize.define(
    'Order',
    {
        userId: {
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        shippingPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        isPaid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        paidAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deliveredAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                'Заказ создан',
                'Обрабатывается',
                'Доставляется',
                'Доставлен',
                'Отменён',
            ],
            defaultValue: 'Заказ создан',
        },
    },
    {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Order, {
    foreignKey: 'userId',
    as: 'orders',
});

Order.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
});

Product.hasMany(Order, {
    as: 'orders',
    foreignKey: 'productId',
});

module.exports = Order;