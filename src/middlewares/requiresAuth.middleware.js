require('dotenv').config();
const jwt = require('jsonwebtoken')
const writeLog = require('../logger');

function authApi(req, res, next) {
    try {
        const token = req.headers.authorization.replace(/Bearer /g, '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: process.env.JWT_ALGORITHM,
            ignoreExpiration: true,
        });
        // console.log('decoded: ', decoded);
        // console.log('decoded.email: ', decoded.email);
        writeLog(__filename, 'requiresAuth.authApi', 'OK');
        next();
    } catch (e) {
        writeLog(__filename, 'requiresAuth.authApi', `ERROR:  ${JSON.stringify(e)}`);
        res.status(401).json({ message: 'UNAUTHORIZED' });
    }
}

module.exports = {
    authApi,
};
