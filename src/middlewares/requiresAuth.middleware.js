require('dotenv').config();
const jwt = require('jsonwebtoken');
const writeLog = require('../logger');
const admins = require('../models').admins;
const users = require('../models').users;

async function authApi(req, res, next) {
    try {
        const token = req.headers.authorization.replace(/Bearer /g, '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: process.env.JWT_ALGORITHM,
            ignoreExpiration: true,
        });
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp < now) {
            writeLog(__filename, 'requiresAuth.authApi', 'JWT has expired');
            res.status(401).json({ status: false, message: 'JWT expired' });
        } else {
            if (decoded.type === 'admin') {
                const admin = await admins.findOne({ where: { id: decoded.id } });
                if (admin) {
                    writeLog(__filename, 'requiresAuth.authApi', 'OK');
                    next();
                } else {
                    writeLog(__filename, 'requiresAuth.authApi', 'Admin not found');
                    res.status(401).json({ status: false, message: 'Admin not found' });
                }
            } else if (decoded.type === 'user') {
                const user = await users.findOne({ where: { id: decoded.id } });
                if (user) {
                    writeLog(__filename, 'requiresAuth.authApi', 'OK');
                    next();
                } else {
                    writeLog(__filename, 'requiresAuth.authApi', 'User not found');
                    res.status(401).json({ status: false, message: 'User not found' });
                }
            }
        }
    } catch (e) {
        writeLog(__filename, 'requiresAuth.authApi', `ERROR:  ${JSON.stringify(e)}`);
        res.status(401).json({ status: false, message: 'UNAUTHORIZED' });
    }
}

module.exports = {
    authApi,
};
