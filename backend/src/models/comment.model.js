const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db.config');
const Product = require('./product.model');
const User = require('./user.model');

const Comment = sequelize.define('Comment', {
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    productId: {
        type: DataTypes.INTEGER,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: true,
    createdAt: 'createdAt',
});

module.exports = Comment;

Comment.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product',
});

Product.hasMany(Comment, {
    foreignKey: 'productId',
    as: 'comments',
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'comments',
});
