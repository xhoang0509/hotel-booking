require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const routers = require('./routers');

const app = express();
const port = process.env.PORT || 6969;

app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('BOOKING.COM API');
});

app.use(routers);
app.listen(port, (req, res) => {
    console.log(`>>>: App is running on http://localhost:${port}`);
});
