const { Router } = require('express');
const { getAll, getOne, update, create } = require('../controllers/location.controller');

const locationRouter = new Router();

locationRouter.get('/', (req, res) => getAll(req, res));
locationRouter.get('/:id', (req, res) => getOne(req, res));
locationRouter.put('/:id', (req, res) => update(req, res));
locationRouter.post('/', (req, res) => create(req, res));
module.exports = locationRouter;
