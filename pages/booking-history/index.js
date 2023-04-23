import WebLayout from '@/components/Layout/WebLayout';
import { LocalStorage } from '@/constants/storage.const';
import { authUser } from '@/helpers/auth.helper';
import { formatDateVN } from '@/helpers/date.helper';
import { formattedPrice } from '@/helpers/price.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import bookingApi from '@/services/booking';
import locationApi from '@/services/location';
import { Button, Space, Table, Tag, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
const moment = require('moment');
require('moment/locale/vi');

export default function BookingHistory({ jwt }) {
    const router = useRouter();
    const user = useSelector((state) => state.user);
    const [info, setInfo] = useState({
        userId: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
    });
    const [local, setLocal] = useState({});
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState({});
    const [room, setRoom] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        setFetching(true);
        try {
            const res = await bookingApi.getBookingsByUser(user.id, jwt);
            if (res.status) {
                setBookings(res.bookings);
                console.log(res.bookings);
            }
        } catch (e) {
            console.log(e);
        }
        setFetching(false);
    }, [user, jwt]);

    const handleChange = (value) => {
        setPaymentMethod(value);
    };

    const handleCheckBox = (e) => {
        setPaymentStatus(e.target.checked);
    };

    const handleBooking = async () => {
        setLoading(true);
        try {
            if (local && local.locationId) {
                const data = {
                    paymentMethod,
                    paymentStatus,
                    ...info,
                    price: local.price.newPrice,
                    locationId: local.locationId,
                    checkInDate: local.checkInOutDate[0],
                    checkOutDate: local.checkInOutDate[1],
                };
                console.log('data: ', data);
                const res = await bookingApi.booking(data, jwt);
                if (res.status) {
                    notification.open({
                        message: 'Đặt phòng thành công',
                        description: 'Bạn đã đặt phòng thành công!',
                        placement: 'topRight',
                        type: 'success',
                    });
                    setTimeout(() => {
                        router.push('/booking-history');
                    }, 1500);
                } else {
                    notification.open({
                        message: 'Đặt phòng thất bại',
                        description: res.message,
                        placement: 'topRight',
                        type: 'error',
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (_, record, index) => (
                <Space size="middle">
                    <a>{index + 1}</a>
                </Space>
            ),
        },
        {
            title: 'Thông tin',
            dataIndex: 'info',
            key: 'info',
            render: (_, record, index) => (
                <>
                    <div>{`${record.firstName} ${record.lastName}`}</div>
                    <div>{`${record.email}`}</div>
                </>
            ),
        },
        {
            title: 'Thanh toán',
            dataIndex: 'price',
            key: 'price',
            render: (_, record, index) => {
                return <Tag color="volcano">{formattedPrice(record.price)}</Tag>;
            },
        },
        {
            title: 'Ngày nhận phòng',
            dataIndex: 'checkInDate',
            key: 'checkInDate',
            render: (_, record, index) => {
                return <span>{formatDateVN(record.checkInDate)}</span>;
            },
        },
        {
            title: 'Ngày trả phòng',
            dataIndex: 'checkOutDate',
            key: 'checkOutDate',
            render: (_, record, index) => {
                return <span>{formatDateVN(record.checkOutDate)}</span>;
            },
        },
        {
            title: 'Thời gian đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record, index) => {
                return <Tag color="red">{formatDateVN(record.createdAt)}</Tag>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (_, record, index) => {
                if (record.paymentStatus) {
                    return <Tag color="green">Đã thanh toán</Tag>;
                } else {
                    return <Tag color="red">Chưa thanh toán</Tag>;
                }
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link href={`/booking-history/${record.id}`}>
                        <Button>Chi tiết</Button>
                    </Link>
                    <Link href={`/booking-history/${record.id}`}>
                        <Button>Chỉnh sửa</Button>
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <WebLayout>
            <div>
                <div className="mb-4 font-bold text-2xl">Lịch sử đặt phòng</div>
                <Table columns={columns} dataSource={bookings} />
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
