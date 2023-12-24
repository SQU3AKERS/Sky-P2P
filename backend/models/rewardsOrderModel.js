const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');
const RewardsStore = require('./rewardsStoreModel');

class RewardsOrder extends Model {}

RewardsOrder.init({
  OrderID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER, allowNull: false },
  ItemID: { type: DataTypes.INTEGER, allowNull: false },
  OrderDate: { type: DataTypes.DATE, allowNull: false },
  Status: { type: DataTypes.ENUM('Pending', 'Completed'), allowNull: false }
}, { sequelize, modelName: 'RewardsOrder', timestamps: false, tableName: 'RewardsOrder' });

// Define relationships
RewardsOrder.belongsTo(User, { foreignKey: 'UserID' });
RewardsOrder.belongsTo(RewardsStore, { foreignKey: 'ItemID' });

module.exports = RewardsOrder;
