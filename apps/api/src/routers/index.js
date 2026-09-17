const { Router } = require('express');
const emailRouter = require('./email.router');
const userRouter = require('./user.router');
const adminRouter = require('./admin.router');
const categoryRouter = require('./category.router');
const cityRouter = require('./city.router');
const ruleRouter = require('./rule.router');
const locationRouter = require('./location.router');
const roomRouter = require('./room.router');
const bookingRouter = require('./booking.router');
const paymentRouter = require('./payment.router');
const analyticRouter = require('./analytic.router');
const fileRouter = require('./file.router');

const routers = new Router();

routers.use('/user', userRouter);
routers.use('/admin', adminRouter);
routers.use('/email', emailRouter);
routers.use('/rule', ruleRouter);
routers.use('/category', categoryRouter);
routers.use('/city', cityRouter);
routers.use('/location', locationRouter);
routers.use('/room', roomRouter);
routers.use('/booking', bookingRouter);
routers.use('/payment', paymentRouter);
routers.use('/analytic', analyticRouter);
routers.use('/file', fileRouter);

module.exports = routers;
