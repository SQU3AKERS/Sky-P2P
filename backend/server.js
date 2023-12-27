require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const sessionRoute = require('./routes/sessionRoute');
const contractRoute = require('./routes/contractRoute');
const transactionRoute = require('./routes/transactionRoute');
const paymentRoute = require('./routes/paymentRoute');

const app = express();

app.options('*', cors());

app.use(session({
    secret: process.env.SESSION_SECRET, // It will look for SESSION_SECRET in .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using https
}));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/session', sessionRoute);
app.use('/api/contract', contractRoute);
app.use('/api/transaction', transactionRoute);
app.use('/api/payment', paymentRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

