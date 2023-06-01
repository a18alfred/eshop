const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db.config');
const slug = require('../utils/slug.util');

const beforeCreateAndUpdate = (category) => {
    category.slug = slug(category.name);
};

const Category = sequelize.define(
    'Category',
    {
        name: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
        },
    },
    {
        hierarchy: true,
        hooks: {
            beforeCreate: beforeCreateAndUpdate,
            beforeUpdate: beforeCreateAndUpdate,
        },
    }
);

module.exports = Category;
