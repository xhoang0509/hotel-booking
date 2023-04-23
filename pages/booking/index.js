import LayoutApp from '@/components/Layout';
import { authAdmin } from '@/helper/auth.helper';
import { checkEnableEdit, translateBookingStatus } from '@/helper/booking.helper';
import { formatDateVN } from '@/helper/date.helper';
import { PaymentMethod } from '@/helper/payment.helper';
import { formattedPrice } from '@/helper/price.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import adminApi from '@/services/admin';
import bookingApi from '@/services/booking';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Skeleton, Space, Table, Tag, Typography, notification } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { END } from 'redux-saga';

export default function Booking({ jwt }) {
    const router = useRouter();
    const [fetching, setFetching] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminId, setAdminId] = useState('');

    const columns = [
        {
            title: 'Thông tin khách hàng',
            dataIndex: 'info_customer',
            key: 'info_customer',
            render: (text, record) => {
                return (
                    <div>
                        <div>
                            {record.firstName} {record.lastName}
                        </div>
                        <div>{record.email}</div>
                    </div>
                );
            },
        },
        {
            title: 'Ngày nhận phòng',
            dataIndex: 'checkInDate',
            key: 'checkInDate',
            render: (text, record) => <Tag color="green">{formatDateVN(text)}</Tag>,
        },
        {
            title: 'Ngày trả phòng',
            dataIndex: 'checkOutDate',
            key: 'checkOutDate',
            render: (text, record) => <Tag color="red">{formatDateVN(text)}</Tag>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => <div className="font-bold">{formattedPrice(text)}</div>,
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (text, record) => <div>{PaymentMethod(text)}</div>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (_, record) => {
                const isEnable = checkEnableEdit(_);
                if (isEnable) {
                    return <Tag color="#108ee9">Đã thanh toán</Tag>;
                } else {
                    return <Tag color="#f50">Chưa thanh toán</Tag>;
                }
            },
        },
        {
            title: 'Tình trạng phòng',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return <Tag color="blue">{translateBookingStatus(_)}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record.id)}>Chỉnh sửa</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        setFetching(true);
        try {
            const res = await bookingApi.getAll(jwt);
            if (res.status) {
                setBookings(res.bookings);
            }
        } catch (error) {
            console.log(error);
        }
        setFetching(false);
    }, [jwt]);

    const handleEditClick = useCallback(
        (id) => {
            router.push(`/booking/${id}`);
        },
        [router]
    );

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = useCallback(async () => {
        try {
            const res = await adminApi.update({ status: 'inactive' }, adminId, jwt);
            if (res.status) {
                notification.open({
                    message: 'Vô hiệu hóa thành công',
                    placement: 'topRight',
                    type: 'success',
                });
                setTimeout(() => {
                    router.reload();
                }, 2000);
            }
        } catch (e) {
            console.log(e);
        }
        setIsModalOpen(false);
    }, [router, adminId, jwt]);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <LayoutApp>
            {fetching && <Skeleton />}
            {!fetching && (
                <>
                    <Typography.Title level={4}>Lịch sửa đặt phòng</Typography.Title>
                    <Button
                        icon={<PlusOutlined />}
                        className="flex items-center text-white mb-4 bg-btn-primary"
                        onClick={() => router.push('/category/add')}
                    >
                        Thêm thể loại mới
                    </Button>
                    <Table columns={columns} dataSource={bookings} />
                    <Modal
                        title="Vô hiệu hóa"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Hủy
                            </Button>,
                            <Button key="submit" danger onClick={handleOk}>
                                Chắc chắn
                            </Button>,
                        ]}
                    >
                        <p>Bạn có chắc chắn muốn vô hiệu hóa nhân viên này không?</p>
                    </Modal>
                </>
            )}
        </LayoutApp>
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
