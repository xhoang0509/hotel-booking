const { Router } = require('express');
const { getAll, getOne, update, create } = require('../controllers/city.controller');

const cityRouter = new Router();

cityRouter.get('/', (req, res) => getAll(req, res));
cityRouter.get('/:id', (req, res) => getOne(req, res));
cityRouter.put('/:id', (req, res) => update(req, res));
cityRouter.post('/', (req, res) => create(req, res));
module.exports = cityRouter;
