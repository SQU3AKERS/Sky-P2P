const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

class LenderPortfolio extends Model {}

LenderPortfolio.init({
  PortfolioID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  LenderID: { type: DataTypes.INTEGER, allowNull: false },
  BlockID: { type: DataTypes.STRING(255), allowNull: false },
  InvestmentAmount: { type: DataTypes.DECIMAL(19, 4), allowNull: false },
  InvestmentDate: { type: DataTypes.DATE, allowNull: false },
  Status: { type: DataTypes.ENUM('Active', 'Earning', 'Completed', 'Defaulted'), allowNull: false }
}, { sequelize, modelName: 'LenderPortfolio', timestamps: false, tableName: 'LenderPortfolio' });

// Define relationships
LenderPortfolio.belongsTo(User, { foreignKey: 'LenderID' });

module.exports = LenderPortfolio;
