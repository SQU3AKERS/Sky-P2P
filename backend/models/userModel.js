const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Users extends Model {}

Users.init({
  UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FirstName: { type: DataTypes.STRING, allowNull: false },
  LastName: { type: DataTypes.STRING, allowNull: false },
  PasswordHash: { type: DataTypes.STRING, allowNull: false },
  Email: { type: DataTypes.STRING, allowNull: false, unique: true },
  DateOfBirth: { type: DataTypes.DATE, allowNull: false },
  Nationality: { type: DataTypes.STRING, allowNull: false },
  UserType: { type: DataTypes.ENUM('Lender', 'Borrower'), allowNull: false },
}, { sequelize, modelName: 'Users', timestamps: false, tableName: 'Users' });

module.exports = Users;
