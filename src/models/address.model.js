"use strict";

module.exports = function (sequelize, Sequelize) {
  const Address = sequelize.define(
    "addresses",
    {
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
      country: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      localAddress: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      postalCode: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Address;
};
