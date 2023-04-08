const { Router } = require('express');
const { login, register, update, getOne, getAll, booking, favorite } = require('../controllers/user.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');

const userRouter = new Router();

userRouter.get('/', authApi, (req, res) => getAll(req, res));
userRouter.get('/:id', authApi, (req, res) => getOne(req, res));
userRouter.post('/register', (req, res) => register(req, res));
userRouter.post('/login', (req, res) => login(req, res));
userRouter.put('/update/:id', authApi, (req, res) => update(req, res));
userRouter.post('/booking', authApi, (req, res) => booking(req, res));
userRouter.post('/favorite', authApi, (req, res) => favorite(req, res));

module.exports = userRouter;
