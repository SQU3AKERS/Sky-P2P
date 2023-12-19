const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
  UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FirstName: { type: DataTypes.STRING, allowNull: false },
  LastName: { type: DataTypes.STRING, allowNull: false },
  PasswordHash: { type: DataTypes.STRING, allowNull: false },
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  DateOfBirth: { type: DataTypes.DATE, allowNull: false },
  Nationality: { type: DataTypes.STRING, allowNull: false },
  UserType: { type: DataTypes.ENUM('Lender', 'Borrower'), allowNull: false },
}, { sequelize, modelName: 'User', timestamps: false });

module.exports = User;
