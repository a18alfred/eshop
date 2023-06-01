const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db.config');
const User = require('./user.model');

const Address = sequelize.define(
    'Address',
    {
        userId: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        postalCode: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        house: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apartment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

Address.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasOne(Address, {
    foreignKey: 'userId',
    as: 'address',
});

module.exports = Address;