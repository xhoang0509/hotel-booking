import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

export function authUser(req, res, token) {
    const cookies = new Cookies(req, res);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        algorithms: process.env.JWT_ALGORITHM,
        ignoreExpiration: true,
    });

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
        cookies.set('bookingJWT', '', { expires: new Date(0) });
    }
}