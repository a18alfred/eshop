const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db.config');
const Image = require('./image.model');
const Category = require('./category.model');
const slug = require('../utils/slug.util');

const beforeCreateAndUpdate = (product) => {
    product.slug = slug(product.name);
    product.cost = product.price - (product.price * product.discount) / 100;
    product.status = product.stock < 1 ? 'Закончился' : 'В наличии';
};

const Product = sequelize.define(
    'Product',
    {
        name: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
        },
        desc: {
            type: DataTypes.TEXT,
        },
        bonus: {
            type: DataTypes.STRING,
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'Руб',
        },
        status: {
            type: DataTypes.ENUM,
            values: ['В наличии', 'Закончился'],
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        discount: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        cost: {
            type: DataTypes.INTEGER,
        },
        sold: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        avgRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        categoryId: {
            type: DataTypes.INTEGER,
        },
    },

    {
        hooks: {
            beforeCreate: beforeCreateAndUpdate,
            beforeUpdate: beforeCreateAndUpdate,
        },
    }
);

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category',
});

Product.hasMany(Image, {
    as: 'images',
    foreignKey: 'productId',
});

Image.belongsTo(Product, {
    foreignKey: 'productId',
});


module.exports = Product;
