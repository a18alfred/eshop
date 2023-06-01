const {Op, Sequelize} = require('sequelize');
const asyncWrapper = require('../middlewares/asyncWrapper.middleware');
const CustomError = require('../utils/error.util');
const Product = require('../models/product.model');
const Image = require('../models/image.model');
const Comment = require('../models/comment.model');
const Category = require('../models/category.model');

class ProductController {
    static get getProduct() {
        return asyncWrapper(async (req, res) => {
            const {page, limit, sort, cost, brand, avgRating, search, categorySlug} = req.query;
            const query = {
                where: {},
                include: [
                    {
                        model: Image,
                        as: 'images',
                    },
                ],
                order: [['images', 'id', 'asc']],
                limit: 10,
                offset: 0,
                distinct: true,
            };

            query.include.push({
                model: Category,
                as: 'category',
            });

            if (limit) {
                query.limit = parseInt(limit);
            }
            if (page) {
                query.offset = parseInt(page - 1) * query.limit;
            }

            if (sort) {
                const newSort = sort.split('-');
                query.order.unshift([newSort[0], newSort[1]]);
            } else {
                query.order.unshift(['id', 'asc']);
            }

            if (avgRating) {
                query.where = {
                    ...query.where,
                    avgRating: {
                        [Op.gte]: parseInt(avgRating),
                    },
                };
            }

            if (brand) {
                query.where = {
                    ...query.brand,
                    [Op.and]: [
                        {
                            [Op.or]: [
                                {
                                    brand: {
                                        [Op.substring]: brand
                                    }
                                },
                                Sequelize.where(
                                    Sequelize.fn('LOWER', Sequelize.col('Product.brand')),
                                    'LIKE',
                                    '%' + brand.toLowerCase() + '%'
                                )
                            ]
                        }
                    ]
                };
            }

            if (search) {
                const searchConditions = {
                    [Op.or]: [
                        {
                            name: {
                                [Op.substring]: search
                            }
                        },
                        Sequelize.where(
                            Sequelize.fn('LOWER', Sequelize.col('Product.name')),
                            'LIKE',
                            '%' + search.toLowerCase() + '%'
                        ),
                        {
                            brand: {
                                [Op.substring]: search
                            }
                        },
                        Sequelize.where(
                            Sequelize.fn('LOWER', Sequelize.col('Product.brand')),
                            'LIKE',
                            '%' + search.toLowerCase() + '%'
                        )
                    ]
                }

                if (query.where[Op.and])
                    query.where[Op.and].push(searchConditions)
                else query.where[Op.and] = searchConditions
            }

            if (cost) {
                const costRanges = cost.split('_');
                const costConditions = {
                    [Op.or]: costRanges.map((range) => {
                        const [min, max] = range.split('-');
                        return {
                            cost: {
                                [Op.between]: [parseInt(min), parseInt(max)],
                            },
                        };
                    })
                }

                if (query.where[Op.and])
                    query.where[Op.and].push(costConditions)
                else query.where[Op.and] = costConditions
            }

            if (categorySlug) {
                const categorySlugs = categorySlug.split('_');
                const categories = await Category.findAll({
                    where: {slug: categorySlugs},
                    attributes: ['id'],
                    include: {
                        model: Category,
                        as: 'descendents',
                        hierarchy: true,
                    },
                });

                const categoryIds = categories.flatMap((category) => getAllCategoryIds(category));

                query.where = {
                    ...query.where,
                    categoryId: {
                        [Op.in]: categoryIds,
                    },
                };
            }

            const {count: countProduct, rows} = await Product.findAndCountAll(
                query
            );

            res.status(200).json({
                products: rows,
                total: countProduct,
                currentPage: parseInt(page) || 1,
                limit: query.limit,
                totalPage: Math.ceil(countProduct / query.limit),
            });
        });
    }

    static get getProductByCode() {
        return asyncWrapper(async (req, res) => {
            const {productCode} = req.params;

            const product = await Product.findOne({
                where: {code: productCode},
                include: [
                    {
                        model: Image,
                        as: 'images',
                    },
                    {
                        model: Category,
                        as: 'category',
                    },
                ],
            });

            if (!product) {
                throw new CustomError({
                    message: 'Товар не найден',
                    status: 404,
                });
            }

            res.status(200).json(product);
        });
    }

    static get createProduct() {
        return asyncWrapper(async (req, res) => {
            const {
                name,
                brand,
                code,
                desc,
                stock,
                discount,
                price,
                categoryId,
            } = req.body;

            if (
                !(
                    name &&
                    brand &&
                    code &&
                    desc &&
                    stock &&
                    discount &&
                    price &&
                    categoryId
                )
            ) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите информацию о товаре',
                });
            }

            const product = await Product.create({...req.body});

            res.status(200).json({
                ...product.get({plain: true}),
            });
        });
    }

    static get updateProduct() {
        return asyncWrapper(async (req, res) => {
            const id = req.params.productId;
            const {data} = req.body;

            const product = await Product.findByPk(id);
            if (!product) {
                throw new CustomError({
                    message: 'Товар не найден',
                    status: 404,
                });
            }

            await Product.update(data, {
                where: {
                    id,
                },
                individualHooks: true,
            });

            res.status(200).json({
                message: 'Информация о товаре успешно обновлена!',
            });
        });
    }

    static get deleteProduct() {
        return asyncWrapper(async (req, res) => {
            const id = req.params.productId;
            const product = await Product.findByPk(id);
            if (!product) {
                throw new CustomError({
                    message: 'Товар не найден',
                    status: 404,
                });
            }

            await Image.destroy({
                where: {
                    productId: id,
                },
            });

            await Comment.destroy({
                where: {
                    productId: id,
                },
            });

            await Product.destroy({
                where: {
                    id,
                },
            });

            res.status(200).json({
                message: 'Товар успешно удалён!',
            });
        });
    }
}

function getAllCategoryIds(category) {
    let categoryIds = [category.id];
    if (category.children && category.children.length > 0) {
        category.children.forEach((child) => {
            const childrenIds = getAllCategoryIds(child);
            categoryIds = categoryIds.concat(childrenIds);
        });
    }

    return categoryIds;
}


module.exports = ProductController;
