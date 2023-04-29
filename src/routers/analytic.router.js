const { Router } = require('express');
const { getAnalytic } = require('../controllers/analytic.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');

const analytic = new Router();

analytic.get('/', authApi, (req, res) => getAnalytic(req, res));
module.exports = analytic;
