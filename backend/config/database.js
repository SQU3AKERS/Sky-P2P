const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', 
  database: 'sys',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('An error occurred while connecting to the database:');
    return;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
