import WebLayout from '@/components/Layout/WebLayout';
import { authUser } from '@/helpers/auth.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import { END } from 'redux-saga';
import { serialize } from 'cookie';
import { useCallback, useEffect, useState } from 'react';
import bookingApi from '@/services/booking';
import { useRouter } from 'next/router';
import { Col, Row, Skeleton } from 'antd';
import { formattedPrice } from '@/helpers/price.helper';
import { formatDateVN } from '@/helpers/date.helper';
import { PaymentMethod } from '@/helpers/payment.helper';

function BookingHistoryId({ jwt }) {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await bookingApi.getOne(id, jwt);
            if (res.status) {
                setBooking(res.booking);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }, [id, jwt]);

    console.log(booking);

    return (
        <WebLayout>
            <div>
                {loading && <Skeleton />}
                {!loading && booking && Object.keys(booking).length > 0 && (
                    <div>
                        <div className="font-bold mb-4 text-xl">
                            Chi tiết phòng đặt: {booking.location.name}
                        </div>
                        <Row gutter={24}>
                            <Col>
                                <img
                                    src={booking.location.thumbnail}
                                    className="w-[200px] h-[200px]"
                                />
                            </Col>
                            <Col>
                                <div className="text-base">
                                    <div className="mb-4">
                                        <span className="font-bold">Email người đặt: </span>
                                        {formattedPrice(booking.email)}
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-bold">Giá: </span>
                                        {formattedPrice(booking.price)}
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-bold">Ngày check in: </span>
                                        {formatDateVN(booking.checkInDate)}
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-bold">Ngày check out: </span>
                                        {formatDateVN(booking.checkOutDate)}
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-bold">Hình thức thanh toán: </span>
                                        {PaymentMethod(booking.paymentMethod)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </WebLayout>
    );
}

export default BookingHistoryId;

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
                    destination: '/',
                    permanent: false,
                },
            };
        }
    } else {
        return {
            redirect: {
                destination: '/',
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
