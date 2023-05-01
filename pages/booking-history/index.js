import WebLayout from '@/components/Layout/WebLayout';
import { authUser } from '@/helpers/auth.helper';
import { TranslateBookingStatus, checkEnableEdit } from '@/helpers/booking.helper';
import { formatDateVN } from '@/helpers/date.helper';
import { formattedPrice } from '@/helpers/price.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import bookingApi from '@/services/booking';
import fileApi from '@/services/file';
import { Button, Space, Table, Tag, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

export default function BookingHistory({ jwt }) {
    const router = useRouter();
    const user = useSelector((state) => state.user);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        setFetching(true);
        try {
            const res = await bookingApi.getBookingsByUser(user.id, jwt);
            if (res.status) {
                setBookings(res.bookings);
            }
        } catch (e) {
            console.log(e);
        }
        setFetching(false);
    }, [user, jwt]);

    const handleExportPdf = async (id) => {
        try {
            const res = await fileApi.createPdf(id, jwt);
            if (res.status) {
                notification.open({
                    message: 'Xuất file thành công!',
                    description: '',
                    placement: 'topRight',
                    type: 'success',
                });
            }
        } catch (e) {}
    };

    const handleSendPdf = async (id) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/file/${id}/pdf`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${jwt}` },
            });
            const blob = res.blob();
            const url = URL.createObjectURL(blob);
            window.open(url);
        } catch (e) {
            notification.open({
                message: 'Lỗi tải file',
                description: e.message,
                placement: 'topRight',
                type: 'error',
            });
        }
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
            title: 'Tình  trạng phòng',
            dataIndex: 'status',
            key: 'status',
            render: (_, record, index) => {
                switch (record.status) {
                    case 'not_check_in':
                        return <Tag color="red">{TranslateBookingStatus(record.status)}</Tag>;
                    case 'check_in':
                        return <Tag color="green">{TranslateBookingStatus(record.status)}</Tag>;
                    case 'check_out':
                        return <Tag color="#108ee9">{TranslateBookingStatus(record.status)}</Tag>;
                    case 'rejected':
                        return <Tag color="#f50">{TranslateBookingStatus(record.status)}</Tag>;
                    default:
                        return '';
                }
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => {
                const isEnableEdit = checkEnableEdit(record.status);
                return (
                    <div className="flex flex-col items-start">
                        {isEnableEdit ? (
                            <Link href={`/booking-history/${record.id}`}>
                                <Button size="small">Chỉnh sửa</Button>
                            </Link>
                        ) : (
                            <Link href={`/booking-history/${record.id}`}>
                                <Button size="small">Chi tiết</Button>
                            </Link>
                        )}
                        <Button
                            size="small"
                            className="mt-2"
                            onClick={() => handleExportPdf(record.id)}
                        >
                            Tạo HĐ
                        </Button>
                        <Button
                            size="small"
                            className="mt-2"
                            onClick={() => handleSendPdf(record.id)}
                        >
                            Tải xuống HĐ
                        </Button>
                    </div>
                );
            },
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
