import cookie from 'cookie';
import { withIronSession } from 'next-iron-session';

const handler = async (req, res) => {
    const { user } = req.body;
    req.session.set('user', user);
    await req.session.save();
    cookie.serialize('auth', user.token);
    res.send({ ok: true });
};

export default withIronSession(handler, {
    password: process.env.SESSION_PASSWORD,
    cookieName: process.env.SESSION_COOKIE_NAME,
    ttl: 60 * 60 * 24 * 7,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
    },
});