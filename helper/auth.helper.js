import jwt from 'jsonwebtoken';


export function authAdmin(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        algorithms: process.env.JWT_ALGORITHM,
        ignoreExpiration: true,
    });

    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp < now) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}