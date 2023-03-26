import Cookies from 'cookies';
import adminApi from './../../services/admin/index';

export default async function handler(req, res) {
    const cookies = new Cookies(req, res);
    if (!req.body) {
        res.statusCode = 404;
        res.end('Error');
        return;
    }
    const { email, password } = req.body;

    // call API to server
    const response = await adminApi.login({ email, password });
    const { status } = response.data;

    // login success
    if (status) {
        const { token } = response.data;
        cookies.set('adminJWT', token, { httpOnly: true, maxAge: Date.now() + 360000 });

        res.status(200).json({
            status,
            token: response.data.token,
            admin: response.data.admin,
        });
        // login failed
    } else {
        res.status(400).json({
            status,
            message: response.data.message,
        });
    }
}
