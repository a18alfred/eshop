const asyncWrapper = require('../middlewares/asyncWrapper.middleware');
const Address = require('../models/address.model');
const CustomError = require('../utils/error.util');
const User = require('../models/user.model');

class AddressController {
    static get createAddress() {
        return asyncWrapper(async (req, res) => {
            const {postalCode, country, region, city, street, house, apartment} = req.body;
            const {userId} = req.user;

            // Verify that the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                throw new CustomError({
                    status: 404,
                    message: 'Пользователь не найден',
                });
            }

            if (!(postalCode && country && region && city && street && house)
            ) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите всё информацию',
                });
            }

            // Create the address
            const address = await Address.create({
                userId,
                postalCode,
                country,
                region,
                city,
                street,
                house,
                apartment: apartment || null,
            });

            res.status(201).json({
                message: 'Адрес успешно создан',
                address,
            });
        });
    }

    static get updateAddress() {
        return asyncWrapper(async (req, res) => {
            const {userId} = req.user;
            const {postalCode, country, region, city, street, house, apartment} = req.body;

            // Verify that the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                throw new CustomError({
                    status: 404,
                    message: 'Пользователь не найден',
                });
            }

            if (!(postalCode && country && region && city && street && house)
            ) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите всё информацию',
                });
            }

            // Find the address by user ID
            const address = await Address.findOne({
                where: {
                    userId,
                },
            });

            if (!address) {
                throw new CustomError({
                    status: 404,
                    message: 'Адрес не найден',
                });
            }

            // Update the address fields
            address.postalCode = postalCode;
            address.country = country;
            address.region = region;
            address.city = city;
            address.street = street;
            address.house = house;
            if (apartment) address.apartment = apartment;

            await address.save();

            res.status(200).json({
                message: 'Адрес успешно обновлен',
                address,
            });
        });
    }
}

module.exports = AddressController;