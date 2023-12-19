const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');
const BorrowerContract = require('./borrowerContractModel');

class Payments extends Model {}

Payments.init({
  PaymentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ContractID: { type: DataTypes.INTEGER, allowNull: false },
  PayerID: { type: DataTypes.INTEGER, allowNull: false },
  PaymentAmount: { type: DataTypes.DECIMAL(19,4), allowNull: false },
  PaymentDate: { type: DataTypes.DATE, allowNull: false },
  PaymentStatus: { type: DataTypes.ENUM('Pending', 'Completed', 'Late'), allowNull: false },
  BlockchainRecordID: { type: DataTypes.STRING }
}, { sequelize, modelName: 'Payments', timestamps: false });

// Define relationships
Payments.belongsTo(BorrowerContract, { foreignKey: 'ContractID' });
Payments.belongsTo(User, { foreignKey: 'PayerID' });

module.exports = { User, BorrowerContract, Payments };
