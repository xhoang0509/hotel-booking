import userApi from '@/services/user';
import jwt from 'jsonwebtoken';

export async function authUser(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        algorithms: process.env.JWT_ALGORITHM,
        ignoreExpiration: true,
    });

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
        return false;
    } else {
        const res = await userApi.getOne(decoded.id, token);
        if (res.status) {
            return true;
        } else {
            return false;
        }
    }
}
