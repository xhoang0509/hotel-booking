const next = require('next');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(
        session({
            secret: 'bookingSecret',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
                same: 'none',
            },
        })
    );
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
