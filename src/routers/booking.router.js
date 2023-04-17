const { Router } = require('express');
const { booking, getAll, getBookingByUser } = require('../controllers/booking.controller');
const bookingRouter = new Router();

bookingRouter.post('/', (req, res) => booking(req, res));
bookingRouter.get('/', (req, res) => getAll(req, res));
bookingRouter.get('/user/:id', (req, res) => getBookingByUser(req, res));

module.exports = bookingRouter;
