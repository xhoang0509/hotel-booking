import LayoutApp from '@/components/Layout';
import { wrapper } from '@/redux/store';
import { END } from 'redux-saga';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import jwt from 'jsonwebtoken';
export default function Home() {
    return (
        <>
            <LayoutApp>HOME PAGE</LayoutApp>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let token = req.cookies['adminJWT'] || '';

    if (token) {
        if (!store.getState().admin.id) {
            store.dispatch(SAGA_GET_ADMIN_DATA_ASYNC(token));
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            algorithms: process.env.JWT_ALGORITHM,
            ignoreExpiration: true,
        });
    } else {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    return {
        props: {
            token,
        },
    };
});
