const Image = require('./models/image.model');
const Product = require('./models/product.model');
const Category = require('./models/category.model');
const User = require('./models/user.model');
const sequelize = require('./configs/db.config');
const products = require('./seederData/products.data');
const categories = require('./seederData/category.data.json');
const users = require('./seederData/user.data.json');

const createProduct = async (products) => {
    try {
        const {
            name,
            brand,
            code,
            stock,
            discount,
            price,
            images,
            desc,
            category,
        } = products;

        const categoryChild = await Category.findOne({
            where: {
                slug: category,
            },
            attributes: ['id'],
        });

        const newProduct = await Product.create({
            name,
            brand,
            code,
            stock,
            discount,
            price,
            desc,
            categoryId: categoryChild.id,
        });

        const image = images.map((image) => {
            return {src: image, alt: newProduct.name, productId: newProduct.id};
        });

        const newImage = await Image.bulkCreate(image);

        console.log({
            ...newProduct.get({plain: true}),
            images: newImage.map((i) => i.get({plain: true})),
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

const createCategory = async (categories) => {
    try {
        const {name, subCategory} = categories;
        const newCategoryParent = await Category.create({name});
        if (subCategory) {
            const newSubCategory = await Category.bulkCreate(subCategory);
            await newCategoryParent.addChildren(newSubCategory);
            await Category.update(
                {parentId: newCategoryParent.id},
                {where: {id: newSubCategory.map((subCategory) => subCategory.id)}}
            );
        }

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const createUser = async (user) => {
    try {
        const {fullName, email} = user;
        // Check if the user already exists
        const existingUser = await User.findOne({
            where: {email},
        });
        if (existingUser) {
            console.log(`User with email ${email} already exists. Skipping.`);
        }

        // Create the user
        await User.create({
            ...user
        });

        console.log(`User ${fullName} created successfully.`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

const main = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
    // categories.forEach(async (category) => await createCategory(category));
    // users.forEach(async (user) => await createUser(user));
    products.forEach(async (product) => await createProduct(product));
};

main();
