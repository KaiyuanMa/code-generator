const Sequelize = require("sequelize");
require('dotenv').config()

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/code-generator"
);

module.exports = conn;
