const asyncWrapper = require('../middlewares/asyncWrapper.middleware');
const Category = require('../models/category.model');
const CustomError = require('../utils/error.util');

class CategoryController {
    static get createCategory() {
        return asyncWrapper(async (req, res) => {
            const {name, parentCategoryId} = req.body;

            if (!name) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите название категории',
                });
            }

            let parentCategory;
            if (parentCategoryId) {
                // Find the parent category by its ID
                parentCategory = await Category.findByPk(parentCategoryId);

                if (!parentCategory) {
                    throw new CustomError({
                        status: 404,
                        message: 'Родительская категория не найдена',
                    });
                }
            }

            const newCategory = await Category.create({
                name: name,
            });

            if (parentCategory) {
                // Add the new category as a child of the parent category
                await parentCategory.addChild(newCategory);
            }

            res.status(201).json({
                message: 'Категория успешно создана',
            });
        });
    }

    static get deleteCategory() {
        return asyncWrapper(async (req, res) => {
            const {categoryId} = req.params;
            if (!categoryId) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, укажите идентификатор категории',
                });
            }
            // Find the category by its ID
            const category = await Category.findByPk(categoryId);
            if (!category) {
                throw new CustomError({
                    status: 404,
                    message: 'Категория не найдена',
                });
            }

            // Delete the category and all its descendents
            await category.destroy({force: true});

            res.status(200).json({
                message: 'Категория успешно удалена',
            });
        });
    }

    static get getCategory() {
        return asyncWrapper(async (req, res) => {
            const categories = await Category.findAll({
                include: {
                    model: Category,
                    as: 'descendents',
                    hierarchy: true,
                    include: {
                        model: Category,
                        as: 'descendents',
                        hierarchy: true,
                    },
                },
                where: {parentId: null}, // Получаем только родительские категории
                order: [['id', 'asc']], // Можно изменить сортировку по вашему усмотрению
            });

            res.status(200).json(categories);
        });
    }
}

module.exports = CategoryController;
