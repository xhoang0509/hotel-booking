const { Router } = require('express');
const emailRouter = require('./email.router');
const userRouter = require('./user.router');
const adminRouter = require('./admin.router');
const categoryRouter = require('./category.router');
const ruleRouter = require('./rule.router');


const routers = new Router();

routers.use('/user', userRouter);
routers.use('/admin', adminRouter)
routers.use('/email', emailRouter);
routers.use('/category', categoryRouter);
routers.use('/rule', ruleRouter);

module.exports = routers;
