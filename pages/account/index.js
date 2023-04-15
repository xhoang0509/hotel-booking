import WebLayout from '@/components/Layout/WebLayout';
import { authUser } from '@/helpers/auth.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import { Card, Col, Row, Typography } from 'antd';
import { serialize } from 'cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

export default function Account({ token }) {
    const router = useRouter();
    return (
        <WebLayout>
            <div className="my-12">
                <Typography.Title level={2}>
                    <span className="text-bold">Cài đặt tài khoản</span>
                </Typography.Title>
                <Typography.Text>Quản lý trải nghiệm Datphong.com của bạn</Typography.Text>
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
                            title={<span className="text-lg text-bold">Lịch sử đặt phòng</span>}
                            className="w-full"
                        >
                            <Link href="" className="">
                                <Typography className="underline text-action">
                                    Xem lịch sử đặt phòng của bạn.
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
    let token = req.cookies['bookingJWT'] || '';

    if (token) {
        const status = await authUser(token);
        if (status) {
            if (!store.getState().user.id) {
                store.dispatch(SAGA_GET_USER_DATA_ASYNC(token));
                store.dispatch(END);
                await store.sagaTask.toPromise();
            }
        } else {
            res.setHeader(
                'Set-Cookie',
                serialize('bookingJWT', '', {
                    httpOnly: true,
                    maxAge: -1,
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                })
            );
            return {
                redirect: {
                    destination: '/account/login',
                    permanent: false,
                },
            };
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
            token,
        },
    };
});
