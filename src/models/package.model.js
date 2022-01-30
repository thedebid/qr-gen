"use strict";

module.exports = function (sequlize, Sequelize) {
  const About = sequlize.define("package", {
    id: {
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    details: {
      type: Sequelize.TEXT("LONG"),
      allowNull: false,
      set(val) {
        this.setDataValue("details", JSON.stringify(val));
      },
    },
  });
  return About;
};
