const { Router } = require('express');
const { booking, getAll, getOne, getBookingByUser } = require('../controllers/booking.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');
const bookingRouter = new Router();

bookingRouter.post('/', authApi, (req, res) => booking(req, res));
bookingRouter.get('/', authApi, (req, res) => getAll(req, res));
bookingRouter.get('/:id', authApi, (req, res) => getOne(req, res));
bookingRouter.get('/:id/user', authApi, (req, res) => getBookingByUser(req, res));

module.exports = bookingRouter;
