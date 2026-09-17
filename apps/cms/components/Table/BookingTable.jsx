import { checkEnableEdit, checkPayment, translateBookingStatus } from '@/helper/booking.helper';
import { formatDateVN } from '@/helper/date.helper';
import { paymentMethod } from '@/helper/payment.helper';
import { formattedPrice } from '@/helper/price.helper';
import bookingApi from '@/services/booking';
import { Button, Table, Tag, Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import React, { useState, useCallback } from 'react';

function BookingTable({ bookings, jwt }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const [type, setType] = useState('');
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        try {
            const data = {
                type,
            };
            const res = await bookingApi.checkInOut(id, data, jwt);
            if (res.status) {
                setIsModalOpen(false);
                notification.open({
                    message: res.message,
                    description: '',
                    placement: 'topRight',
                    type: 'success',
                });
                await new Promise((resolve) => setTimeout(resolve, 1500));
                router.reload();
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEditClick = useCallback(
        (id) => {
            router.push(`/booking/${id}`);
        },
        [router]
    );

    const handleCheckIn = (id) => {
        setTitle('Xác nhận khách check in!');
        setType('check_in');
        setId(id);
        showModal();
    };

    const handleCheckOut = (id) => {
        setTitle('Xác nhận khách check out');
        setType('check_out');
        setId(id);
        showModal();
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'bookingId',
            key: 'id',
        },
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
            render: (text, record) => <div>{paymentMethod(text)}</div>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (_, record) => {
                const isPayment = checkPayment(_);
                if (isPayment) {
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
                let color = '';
                if (record.status === 'not_check_in') {
                    color = 'magenta';
                } else if (record.status === 'check_in') {
                    color = 'cyan';
                } else if (record.status === 'check_out') {
                    color = 'green';
                } else if (record.status === 'rejected') {
                    color = '#f50';
                }
                return <Tag color={color}>{translateBookingStatus(_)}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div className="flex flex-col">
                    <Button
                        size="small"
                        className="mb-1"
                        onClick={() => handleEditClick(record.id)}
                    >
                        Chi tiết
                    </Button>

                    {record.status === 'not_check_in' && (
                        <Button
                            size="small"
                            className="mb-1 bg-btn-warning"
                            onClick={() => handleCheckIn(record.id)}
                        >
                            Check in
                        </Button>
                    )}
                    {record.status === 'check_in' && (
                        <Button
                            size="small"
                            className="bg-btn-danger text-white"
                            onClick={() => handleCheckOut(record.id)}
                        >
                            Check out
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Table columns={columns} dataSource={bookings} />
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel} danger key={1}>
                        Hủy
                    </Button>,
                    <Button
                        className="bg-btn-primary text-white"
                        loading={isConfirmLoading}
                        onClick={handleOk}
                        key={2}
                    >
                        Xác nhận
                    </Button>,
                ]}
            ></Modal>
        </React.Fragment>
    );
}

export default BookingTable;
