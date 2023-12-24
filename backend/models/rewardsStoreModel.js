const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class RewardsStore extends Model {}

RewardsStore.init({
  ItemID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ItemName: { type: DataTypes.STRING(255), allowNull: false },
  ItemDescription: { type: DataTypes.TEXT },
  PointsCost: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'RewardsStore', timestamps: false, tableName: 'RewardsStore' });

module.exports = RewardsStore;
