const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

class RewardsPoints extends Model {}

RewardsPoints.init({
  RewardsID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER, allowNull: false },
  Points: { type: DataTypes.INTEGER, allowNull: false },
  AcquiredDate: { type: DataTypes.DATE, allowNull: false },
}, { sequelize, modelName: 'RewardsPoints', timestamps: false, tableName: 'RewardsPoints' });

// Define relationships
RewardsPoints.belongsTo(User, { foreignKey: 'UserID' });

module.exports = RewardsPoints;
