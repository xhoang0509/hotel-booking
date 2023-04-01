const { Router } = require('express');
const { getAll, getOne, update, create } = require('../controllers/category.controller');

const categoryRouter = new Router();

categoryRouter.get('/', (req, res) => getAll(req, res));
categoryRouter.get('/:id', (req, res) => getOne(req, res));
categoryRouter.put('/:id', (req, res) => update(req, res));
categoryRouter.post('/', (req, res) => create(req, res));
module.exports = categoryRouter;
