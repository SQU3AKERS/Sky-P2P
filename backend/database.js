const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1', // e.g., localhost
  user: 'root',
  password: '1234',
  database: 'sky-p2p-db'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('An error occurred while connecting to the DB');
    throw err;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
