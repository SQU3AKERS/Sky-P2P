const { Sequelize } = require('sequelize');

const HOST = 'localhost';
const USER = 'root';
const PASSWORD = 'password';
const DATABASE = 'sys';
const PORT = 3306;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'mysql',
  logging: (...msg) => console.log(msg),
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the Sequelize!');
  })
  .catch(err => {
    console.error('An error occurred while connecting to the Sequelize:', err);
  });

module.exports = sequelize;
