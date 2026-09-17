const { Router } = require('express');
const { getAll } = require('../controllers/rule.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');

const ruleRouter = new Router();

ruleRouter.get('/', authApi, (req, res) => getAll(req, res));

module.exports = ruleRouter;
