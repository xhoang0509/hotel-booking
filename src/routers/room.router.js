const { Router } = require('express');
const { getAll, getOne } = require('../controllers/room.controller');

const roomRouter = new Router();

roomRouter.get('/', (req, res) => getAll(req, res));
roomRouter.get('/:id', (req, res) => getOne(req, res));
module.exports = roomRouter;
