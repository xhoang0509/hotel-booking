import Banner from '@/components/Home/Banner';
import SummaryChart from '@/components/Home/Chart';
import ProjectAndTimelint from '@/components/Home/ProjectAndTimeline';
import Summary from '@/components/Home/Summary';
import LayoutApp from '@/components/Layout';
import { authAdmin } from '@/helper/auth.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import { END } from 'redux-saga';

export default function Home({ jwt }) {
    return (
        <>
            <LayoutApp>
                <Summary jwt={jwt} />
                <SummaryChart />
                {/* <ProjectAndTimelint /> */}
                {/* <Banner /> */}
            </LayoutApp>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let token = req.cookies['adminJWT'] || '';
    if (token) {
        const status = await authAdmin(token);
        if (status) {
            if (!store.getState().admin.id) {
                store.dispatch(SAGA_GET_ADMIN_DATA_ASYNC(token));
                store.dispatch(END);
                await store.sagaTask.toPromise();
            }
        } else {
            res.setHeader(
                'Set-Cookie',
                'adminJWT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
            );
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
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
            jwt: token,
        },
    };
});
