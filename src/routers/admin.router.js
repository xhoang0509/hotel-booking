const { Router } = require('express');
const { login, register, update, getOne } = require('../controllers/admin.controller');
const { authApi } = require('../middlewares/requiresAuth.middleware');

const adminRouter = new Router();

adminRouter.get('/:id', authApi, (req, res) => getOne(req, res));
adminRouter.post('/register', (req, res) => register(req, res));
adminRouter.post('/login', (req, res) => login(req, res));
adminRouter.put('/update/:id', authApi, (req, res) => update(req, res));

module.exports = adminRouter;
