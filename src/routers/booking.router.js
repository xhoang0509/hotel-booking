const { Router } = require('express');
const {
    booking,
    getAll,
    update,
    getOne,
    getBookingByUser,
    checkRoom,
} = require('../controllers/booking.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');
const bookingRouter = new Router();

bookingRouter.post('/', authApi, (req, res) => booking(req, res));
bookingRouter.get('/', authApi, (req, res) => getAll(req, res));
bookingRouter.get('/:id', authApi, (req, res) => getOne(req, res));
bookingRouter.put('/:id', authApi, (req, res) => update(req, res));
bookingRouter.get('/:id/user', authApi, (req, res) => getBookingByUser(req, res));
bookingRouter.post('/checkroom', authApi, (req, res) => checkRoom(req, res));
module.exports = bookingRouter;
