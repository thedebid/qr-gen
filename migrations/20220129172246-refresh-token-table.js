'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return await queryInterface.createTable('refreshtokens', {
      id: {
        defaultValue: DataTypes.UUID,
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      token: { type: DataTypes.STRING },
      expires: { type: DataTypes.DATE },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      createdByIp: { type: DataTypes.STRING },
      revoked: { type: DataTypes.DATE },
      revokedByIp: { type: DataTypes.STRING },
      replacedByToken: { type: DataTypes.STRING },
      isExpired: {
        type: DataTypes.BOOLEAN,
        get() {
          return Date.now() >= this.expires;
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        get() {
          return !this.revoked && !this.isExpired;
        },
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
