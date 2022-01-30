"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("generatedqrs", {
      id: {
        defaultValue: Sequelize.UUID,
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
      },
      qr: {
        type: Sequelize.TEXT("LONG"),
        allowNull: true,
      },
      file: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      expiresIn: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      paymentStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
