const { Router } = require('express');
const { login, register, update } = require('../controllers/user.controller');

const userRouter = new Router();

userRouter.post('/register', (req, res) => register(req, res));
userRouter.post('/login', (req, res) => login(req, res));
userRouter.put('/update/:id', (req, res) => update(req, res));

module.exports = userRouter;
