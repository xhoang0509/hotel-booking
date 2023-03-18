const { Router } = require('express');
const emailRouter = require('./email.router');
const userRouter = require('./user.router');

const routers = new Router();

routers.use('/user', userRouter);
routers.use('/email', emailRouter);

module.exports = routers;
