const { Router } = require('express');
const { getAnalytic, lineChart } = require('../controllers/analytic.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');

const analytic = new Router();

analytic.get('/', authApi, (req, res) => getAnalytic(req, res));
analytic.get('/linechart', authApi, (req, res) => lineChart(req, res));
module.exports = analytic;
