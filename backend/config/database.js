const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', 
  database: 'sys',
  port: 3306
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    return;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
