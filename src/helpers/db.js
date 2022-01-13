"use strict";
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("CONNECTED TO DATABASE!");
} catch (error) {
  console.error("Unable to connect to the database", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./../models/user.model")(sequelize, Sequelize);

// db.aboutus = require("./../modules/aboutus/models/about.model")(
//   sequelize,
//   Sequelize
// );
// db.award = require("./../modules/award/models/award.model")(
//   sequelize,
//   Sequelize
// );

module.exports = db;
