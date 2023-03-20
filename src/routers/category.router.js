const { Router } = require('express');
const { getAll, get } = require('../controllers/category.controller');

const categoryRouter = new Router();

categoryRouter.get('/', (req, res) => getAll(req, res));
categoryRouter.get('/:id', (req, res) => get(req, res));
module.exports = categoryRouter;
