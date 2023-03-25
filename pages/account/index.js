import WebLayout from '@/components/Layout/WebLayout';
import { Card, Col, Row, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { wrapper } from '@/redux/store';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { END } from 'redux-saga';

export default function Account({ jwt }) {
    console.log(jwt);
    const router = useRouter();
    return (
        <WebLayout>
            <div className="my-12">
                <Typography.Title level={2}>
                    <span className="text-bold">Cài đặt tài khoản</span>
                </Typography.Title>
                <Typography.Text>Quản lý trải nghiệm Booking.com của bạn</Typography.Text>
                <Row gutter={12} className="my-4">
                    <Col span={12}>
                        <Card
                            title={<span className="text-lg text-bold">Thông tin cá nhân</span>}
                            className="w-full cursor-pointer"
                            onClick={() => router.push('/account/personal')}
                        >
                            <Link href="" className="">
                                <Typography className="hover:text-action">
                                    Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử
                                    dụng ra sao.
                                </Typography>
                                <Typography className="underline text-action">
                                    Quản lý thông tin cá nhân.
                                </Typography>
                            </Link>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            title={<span className="text-lg text-bold">Các tùy chọn</span>}
                            className="w-full"
                        >
                            <Link href="" className="">
                                <Typography className="hover:text-action">
                                    Thay đổi ngôn ngữ, tiền tệ và các yêu cầu hỗ trợ khuyết tật.
                                </Typography>
                                <Typography className="underline text-action">
                                    Quản lý tùy chọn.
                                </Typography>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </WebLayout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let jwt = req.cookies['bookingJWT'] || '';

    if (jwt) {
        if (!store.getState().user.id) {
            store.dispatch(SAGA_GET_USER_DATA_ASYNC(jwt));
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
    } else {
        return {
            redirect: {
                destination: '/account/login',
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
