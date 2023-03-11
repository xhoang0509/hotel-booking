const writeLog = require('../logger');

require('dotenv').config();

const { JWT_SECRET_KEY, JWT_ALGORITHM } = process.env;

async function authApi(req, res, next) {
    try {
        const token = req.headers.authorization.replace(/Bearer /g, '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: process.env.JWT_ALGORITHM,
            ignoreExpiration: true,
        });
        writeLog(__filename, 'requiresAuth.authApi', 'OK');
        await next();
    } catch (e) {
        writeLog(__filename, 'requiresAuth.authApi', `ERROR:  ${JSON.stringify(e)}`);
        res.statusCode(401).json({ message: 'UNAUTHORIZED' });
    }
}

module.exports = {
    authApi,
};
