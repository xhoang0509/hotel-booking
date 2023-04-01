require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routers = require('./routers');

const app = express();
const port = process.env.PORT || 6969;

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:6969'],
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.JWT_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
);

app.get('/', (req, res) => {
    res.send('BOOKING.COM API');
});

app.use(routers);
app.listen(port, (req, res) => {
    console.log(`>>>: App is running on http://localhost:${port}`);
});
