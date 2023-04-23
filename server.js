const next = require('next');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 5000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    console.log('log by server');
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(`🚀 Ready on http://${hostname}:${port}`);
    });
});
