'use strict';

module.exports = function (sequlize, DataTypes) {
  const RToken = sequlize.define(
    'refreshtoken',
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.VIRTUAL,
        get() {
          return Date.now() >= this.expires;
        },
      },
      isActive: {
        type: DataTypes.VIRTUAL,
        get() {
          return !this.revoked && !this.isExpired;
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return RToken;
};
