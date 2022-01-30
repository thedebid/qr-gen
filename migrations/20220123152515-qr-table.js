"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("qrs", {
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
