import WebLayout from '@/components/Layout/WebLayout';
import { authUser } from '@/helpers/auth.helper';
import { formatDateVN } from '@/helpers/date.helper';
import { PaymentMethod } from '@/helpers/payment.helper';
import { formattedPrice } from '@/helpers/price.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import bookingApi from '@/services/booking';
import { Button, Col, DatePicker, Form, Row, Skeleton, notification } from 'antd';
import { serialize } from 'cookie';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { END } from 'redux-saga';

const dateFormat = 'YYYY-MM-DD';
function BookingHistoryId({ jwt }) {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await bookingApi.getOne(id, jwt);
            if (res.status) {
                setBooking(res.booking);
                setCheckInDate(res.booking.checkInDate);
                setCheckOutDate(res.booking.checkOutDate);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }, [id, jwt]);

    const handleCheckInDateChange = (date, dateString) => {
        setCheckInDate(dateString);
        setErrorMessage('');
    };
    const handleCheckOutDateChange = (date, dateString) => {
        setCheckOutDate(dateString);
        setErrorMessage('');
    };

    const handleEdit = async () => {
        setIsLoading(true);
        try {
            const data = {
                checkInDate,
                checkOutDate,
            };
            if (!checkInDate || !checkOutDate) {
                setErrorMessage('Ngày nhận phòng hoặc trả phòng không được để trống!');
                setIsLoading(false);
                return;
            }
            const res = await bookingApi.update(id, data, jwt);
            if (res.status) {
                notification.open({
                    message: 'Cập nhật thông tin phòng thành công',
                    placement: 'topRight',
                    type: 'success',
                });
            }
            setErrorMessage('');
            await new Promise((resolve) => setTimeout(resolve, 2000));
            router.reload();
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    const handleFinish = () => {};

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
                                    alt={booking.location.name}
                                />
                            </Col>
                            <Col>
                                <Form form={form} onFinish={handleFinish}>
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
                                            <Form.Item
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Ngày nhận phòng không được để trống!',
                                                    },
                                                ]}
                                            >
                                                <DatePicker
                                                    defaultValue={dayjs(
                                                        booking.checkInDate,
                                                        dateFormat
                                                    )}
                                                    format={dateFormat}
                                                    onChange={handleCheckInDateChange}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="mb-4">
                                            <span className="font-bold">Ngày check out: </span>
                                            {formatDateVN(booking.checkOutDate)}
                                            <Form.Item
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Ngày trả phòng không được để trống!',
                                                    },
                                                ]}
                                            >
                                                <DatePicker
                                                    defaultValue={dayjs(
                                                        booking.checkOutDate,
                                                        dateFormat
                                                    )}
                                                    format={dateFormat}
                                                    onChange={handleCheckOutDateChange}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="mb-4">
                                            <span className="font-bold">
                                                Hình thức thanh toán:{' '}
                                            </span>
                                            {PaymentMethod(booking.paymentMethod)}
                                        </div>
                                        <Form.Item>
                                            <div className="text-red mb-4">{errorMessage}</div>
                                            <Button
                                                onClick={handleEdit}
                                                danger
                                                loading={isLoading}
                                                htmlType="submit"
                                            >
                                                Chỉnh sửa
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
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
