const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');
const BorrowerContract = require('./borrowerContractModel');

class LenderPortfolio extends Model {}

LenderPortfolio.init({
  PortfolioID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  LenderID: { type: DataTypes.INTEGER, allowNull: false },
  ContractID: { type: DataTypes.INTEGER, allowNull: false },
  InvestmentAmount: { type: DataTypes.DECIMAL(19,4), allowNull: false },
  InvestmentDate: { type: DataTypes.DATE, allowNull: false },
  Status: { type: DataTypes.ENUM('Active', 'Earning', 'Completed', 'Defaulted'), allowNull: false }
}, { sequelize, modelName: 'LenderPortfolio', timestamps: false });

// Define relationships
LenderPortfolio.belongsTo(User, { foreignKey: 'LenderID' });
LenderPortfolio.belongsTo(BorrowerContract, { foreignKey: 'ContractID' });

module.exports = { User, BorrowerContract, LenderPortfolio };
