import { withIronSession } from 'next-iron-session';

function handler(req, res, session) {
    req.session.destroy();
    res.send('Logged out');
}

export default withIronSession(handler, {
    password: process.env.SESSION_SECRET,
    cookieName: process.env.SESSION_COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
});
