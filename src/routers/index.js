const { Router } = require('express');
const userRouter = require('./user.router');

const routers = new Router();

routers.use('/user', userRouter);

module.exports = routers;
