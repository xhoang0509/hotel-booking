const { Router } = require('express');
const emailRouter = require('./email.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');

const routers = new Router();

routers.use('/user', userRouter);
routers.use('/email', emailRouter);
routers.use('/category', categoryRouter);

module.exports = routers;
