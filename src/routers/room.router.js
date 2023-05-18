const { Router } = require('express');
const { getAll, getOne, create, update } = require('../controllers/room.controller');

const roomRouter = new Router();

roomRouter.get('/', (req, res) => getAll(req, res));
roomRouter.get('/:id', (req, res) => getOne(req, res));
roomRouter.post('/', (req, res) => create(req, res));
roomRouter.put('/:id', (req, res) => update(req, res));
module.exports = roomRouter;
