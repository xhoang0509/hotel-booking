import LayoutApp from '@/components/Layout';
import { wrapper } from '@/redux/store';
import { END } from 'redux-saga';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';

export default function Home() {
    return (
        <>
            <LayoutApp>HOME PAGE</LayoutApp>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let jwt = req.cookies['adminJWT'] || '';

    if (jwt) {
        if (!store.getState().admin.id) {
            store.dispatch(SAGA_GET_ADMIN_DATA_ASYNC(jwt));
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
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
            jwt,
        },
    };
});
