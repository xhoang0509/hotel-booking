import writeLog from '@/logger';
import adminApi from '@/services/admin';
import jwt from 'jsonwebtoken';


export async function authAdmin(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        algorithms: process.env.JWT_ALGORITHM,
        ignoreExpiration: true,
    });

    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp < now) {
        return false;
    } else {
        try {
            const res = await adminApi.getOne(decoded.id, token);
            return res.status;
        } catch (e) {
            writeLog('auth.helper', 'authAdmin', e.message, "FAILED");
            return false;
        }
    }
}