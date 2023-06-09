const { Sequelize } = require("sequelize");
const SequelizeHierarchy = require("sequelize-hierarchy-v6");
SequelizeHierarchy(Sequelize);
require("dotenv").config();

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  timezone: process.env.DB_TIMEZONE,
  logging: false,
});

module.exports = sequelize;
