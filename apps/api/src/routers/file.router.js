const { Router } = require('express');
const { authApi } = require('../middlewares/requiresAuth.middleware');
const {
    sendPdf,
    createPdf,
    createBookingExcel,
    sendBookingExcel,
} = require('../controllers/file.controller');

const fileRouter = new Router();

fileRouter.post('/:id/pdf', authApi, (req, res) => createPdf(req, res));
fileRouter.get('/:id/pdf', authApi, (req, res) => sendPdf(req, res));
fileRouter.post('/booking/excel', authApi, (req, res) => createBookingExcel(req, res));
fileRouter.get('/booking/excel', authApi, (req, res) => sendBookingExcel(req, res));
module.exports = fileRouter;
