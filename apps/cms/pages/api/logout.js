import Cookies from 'cookies';

export default async function handler(req, res) {
    const cookies = new Cookies(req, res);
    cookies.set('adminJWT', '', { expires: new Date(0) });
    res.status(200).json({
        status: true,
        message: 'Logout successfully!',
    });
}
