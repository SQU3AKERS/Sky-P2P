const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'sys'
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
