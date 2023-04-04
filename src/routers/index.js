const { Router } = require('express');
const emailRouter = require('./email.router');
const userRouter = require('./user.router');
const adminRouter = require('./admin.router');
const categoryRouter = require('./category.router');
const cityRouter = require('./city.router');
const ruleRouter = require('./rule.router');
const locationRouter = require('./location.router');

const routers = new Router();

routers.use('/user', userRouter);
routers.use('/admin', adminRouter);
routers.use('/email', emailRouter);
routers.use('/rule', ruleRouter);
routers.use('/category', categoryRouter);
routers.use('/city', cityRouter);
routers.use('/location', locationRouter);

module.exports = routers;
