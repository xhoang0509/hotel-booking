const { Router } = require('express');
const { send } = require('../controllers/email.controller');

const emailRouter = new Router();

emailRouter.post('/send', (req, res) => send(req, res));

module.exports = emailRouter;
