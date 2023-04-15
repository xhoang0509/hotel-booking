const { Router } = require('express');
const {
    login,
    register,
    update,
    getOne,
    getAll,
    booking,
    getFavorite,
    postFavorite,
    verify,
    requestOtp,
    forgotPassword,
    resetPassowrd,
} = require('../controllers/user.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');
const limiter = require('../middlewares/rateLimit.middleware');

const userRouter = new Router();

userRouter.get('/', authApi, (req, res) => getAll(req, res));
userRouter.get('/:id', authApi, (req, res) => getOne(req, res));
userRouter.post('/register', (req, res) => register(req, res));
userRouter.post('/login', (req, res) => login(req, res));
userRouter.post('/verify', (req, res) => verify(req, res));
userRouter.put('/update/:id', authApi, (req, res) => update(req, res));
userRouter.post('/booking', authApi, (req, res) => booking(req, res));
userRouter.get('/favorite/:id', authApi, (req, res) => getFavorite(req, res));
userRouter.post('/favorite', authApi, (req, res) => postFavorite(req, res));
userRouter.post('/request-otp', limiter(5 * 60 * 1000, 1), (req, res) => requestOtp(req, res));
userRouter.post('/forgot-password', limiter(5 * 60 * 1000, 1), (req, res) =>
    forgotPassword(req, res)
);
userRouter.post('/reset-password', (req, res) => resetPassowrd(req, res));

module.exports = userRouter;
