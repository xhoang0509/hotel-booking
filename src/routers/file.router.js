const { Router } = require('express');
const { authApi } = require('../middlewares/requiresAuth.middleware');
const { sendPdf, createPdf } = require('../controllers/file.controller');

const fileRouter = new Router();

fileRouter.post('/:id/pdf', authApi, (req, res) => createPdf(req, res));
fileRouter.get('/:id/pdf', authApi, (req, res) => sendPdf(req, res));
module.exports = fileRouter;
