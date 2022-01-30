'use strict';

module.exports = function (sequlize, Sequelize) {
  const User = sequlize.define(
    'user',
    {
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
        type: Sequelize.VIRTUAL,
        get() {
          return !!(this.verified || this.passwordReset);
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
};
