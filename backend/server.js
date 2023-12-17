require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Enable JSON body parsing
sequelize.sync().then(() => {
  console.log('Database synced with Sequelize');
});
app.use('/api/users', registerRoute);
app.use('/api/login', loginRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
