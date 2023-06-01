const {DataTypes} = require('sequelize');
const sequelize = require('../configs/db.config');
const bcrypt = require('bcryptjs');

const hashPassword = async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }
};

const User = sequelize.define(
    'User',
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50],
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^\+\d{11}$/
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            defaultValue: 'user',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 100],
                    msg: 'Пароль минимум 8 символов, максимум 100 символов',
                },
            },
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passwordToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        passwordTokenExpirationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING
        }
    },
    {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
        },
    }
);

module.exports = User;
