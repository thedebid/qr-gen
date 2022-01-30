"use strict";

module.exports = function (sequlize, Sequelize) {
  const About = sequlize.define("qr", {
    id: {
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      onDelete: "cascade",
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    qr: {
      type: Sequelize.TEXT("LONG"),
      allowNull: false,
    },
  });
  return About;
};
