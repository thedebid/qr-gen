"use strict";

module.exports = function (sequlize, Sequelize) {
  const About = sequlize.define("user", {
    id: {
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });
  return About;
};
