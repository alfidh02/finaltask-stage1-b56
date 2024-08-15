const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "me",
  host: "localhost",
  dialect: "postgres",
  database: "finaltaskdumb",
  password: "password",
  port: 5432,
  schema: "public",
});

module.exports = db;
