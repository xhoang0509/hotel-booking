const { Router } = require('express');
const { authApi } = require('../middlewares/requiresAuth.middleware');
const { createPdf } = require('../controllers/file.controller');

const fileRouter = new Router();

fileRouter.post('/:id/pdf', (req, res) => createPdf(req, res));
module.exports = fileRouter;
