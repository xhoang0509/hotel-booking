const { Router } = require('express');
const users = require('../models').users;
const { login, register } = require('../controllers/user.controller');

const userRouter = new Router();

userRouter.post('/register', (req, res) => register(req, res));
userRouter.post('/login', (req, res) => login(req, res));

module.exports = userRouter;
