require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', registerRoute);
app.use('/api/login', loginRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
