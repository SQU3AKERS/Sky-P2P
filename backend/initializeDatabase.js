const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('./config/sequelize');

const sequelizedb = new Sequelize(config.database, config.username, config.password, config);

const initializeDatabase = async () => {
  try {
    // Path to your SQL files
    const sqlDirectory = path.join(__dirname, 'storage', 'sql');

    // Read and sort SQL files from the directory
    const sqlFiles = fs.readdirSync(sqlDirectory)
                       .filter(file => file.endsWith('.sql'))
                       .sort();

    for (const file of sqlFiles) {
      const filePath = path.join(sqlDirectory, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      // Execute the SQL file
      await sequelizedb.query(sql);
      console.log(`Executed file: ${file}`);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  } finally {
    await sequelizedb.close();
  }
};

initializeDatabase();
