const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/registerRoute');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Enable JSON body parsing
app.use('/api/users', registerRoute);

// Define a POST route for registration
app.post('/register', (req, res) => {
});

// Start the server on port 3001, avoid conflict port 3000 with React
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
