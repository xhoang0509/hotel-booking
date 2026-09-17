const { Router } = require('express');
const { createPaymentUrl, getCodeIpnUrl } = require('../controllers/payment.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');

const payment = new Router();

payment.post('/', authApi, (req, res) => createPaymentUrl(req, res));
payment.get('/', authApi, (req, res) => getCodeIpnUrl(req, res));
module.exports = payment;
