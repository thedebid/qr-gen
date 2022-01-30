'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('users', {
      id: {
        defaultValue: Sequelize.UUID,
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
      role: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      verificationToken: {
        type: Sequelize.STRING(255),
      },
      verified: {
        type: Sequelize.DATE,
      },
      resetToken: {
        type: Sequelize.STRING(255),
      },
      resetTokenExpires: {
        type: Sequelize.DATE,
      },
      passwordReset: {
        type: Sequelize.DATE,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated: {
        type: Sequelize.DATE,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
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
