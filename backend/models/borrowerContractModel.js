const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

class BorrowerContract extends Model {}

BorrowerContract.init({
  ContractID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  BorrowerID: { type: DataTypes.INTEGER, allowNull: false },
  LoanAmount: { type: DataTypes.DECIMAL(19,4), allowNull: false },
  InterestRate: { type: DataTypes.DECIMAL(5,2), allowNull: false },
  StartDate: { type: DataTypes.DATE, allowNull: false },
  EndDate: { type: DataTypes.DATE, allowNull: false },
  Status: { type: DataTypes.ENUM('Available', 'Accepted', 'Active', 'Completed', 'Defaulted'), allowNull: false },
  BlockchainRecordID: { type: DataTypes.STRING }
}, { sequelize, modelName: 'BorrowerContract', timestamps: false, tableName: 'BorrowerContract'});

// Define relationships
BorrowerContract.belongsTo(User, { foreignKey: 'BorrowerID' });

module.exports = { User, BorrowerContract };
