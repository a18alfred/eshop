const asyncWrapper = require('../middlewares/asyncWrapper.middleware');
const Comment = require('../models/comment.model');
const CustomError = require('../utils/error.util');
const Product = require('../models/product.model');
const User = require('../models/user.model');

class CommentController {
    static get createComment() {
        return asyncWrapper(async (req, res) => {
            const {productId, rating, comment} = req.body;
            const {userId} = req.user;

            if (!(productId && rating)
            ) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите всё информацию',
                });
            }

            // Verify that the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                throw new CustomError({
                    status: 404,
                    message: 'Пользователь не найден',
                });
            }

            // Validate the rating value
            if (rating < 1 || rating > 5) {
                throw new CustomError({
                    status: 400,
                    message: 'Рейтинг должен быть между 1 и 5',
                });
            }

            // Create the comment
            const newComment = await Comment.create({
                productId,
                rating,
                comment,
                userId,
            });

            const product = await Product.findByPk(productId);
            const existingComments = await Comment.findAll({
                where: {
                    productId,
                },
            });

            const ratingsSum = existingComments.reduce(
                (sum, comment) => sum + comment.rating,
                0
            );
            product.avgRating = ratingsSum / existingComments.length;
            await product.save();

            res.status(201).json({
                message: 'Комментарий успешно создан',
                comment: newComment,
            });
        });
    }

    static get deleteComment() {
        return asyncWrapper(async (req, res) => {
            const {commentId} = req.params;
            const {userId, role} = req.user;

            if (!commentId) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите информацию о товаре',
                });
            }

            // Find the comment by its ID
            const comment = await Comment.findByPk(commentId);

            if (!comment) {
                throw new CustomError({
                    status: 404,
                    message: 'Комментарий не найден',
                });
            }

            // Check if the user is the owner of the comment or an admin
            if (comment.userId !== userId && role !== 'admin') {
                throw new CustomError({
                    status: 403,
                    message: 'У вас нет прав на данную операцию',
                });
            }

            // Get the product ID associated with the comment
            const productId = comment.productId;

            // Delete the comment
            await comment.destroy();

            // Recalculate the average rating for the product
            const product = await Product.findByPk(productId, {
                include: {
                    model: Comment,
                    as: 'comments',
                },
            });

            const comments = product.comments;
            const totalRatings = comments.length;
            const sumRatings = comments.reduce((sum, comment) => sum + comment.rating, 0);
            // Update the average rating of the product
            product.avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

            res.status(200).json({
                message: 'Комментарий успешно удален',
            });
        });
    }

    static get getCommentsByProduct() {
        return asyncWrapper(async (req, res) => {
            const {productId} = req.params;
            const {page = 1, limit = 10} = req.query;

            if (!productId) {
                throw new CustomError({
                    status: 400,
                    message: 'Пожалуйста, введите информацию о товаре',
                });
            }

            // Calculate the offset based on the page and limit
            const offset = (page - 1) * limit;

            // Find all comments for the specified product with pagination
            const {count, rows} = await Comment.findAndCountAll({
                where: {
                    productId,
                },
                limit,
                offset,
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name'],
                    },
                ],
                attributes: ['id', 'rating', 'comment', 'createdAt'],
            });

            res.status(200).json({
                comments: rows,
                meta: {
                    total: count,
                    currentPage: page,
                    totalPages: Math.ceil(count / limit),
                }
            });
        });
    }
}

module.exports = CommentController;