import LayoutApp from '@/components/Layout';
import BookingTable from '@/components/Table/BookingTable';
import { authAdmin } from '@/helper/auth.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import adminApi from '@/services/admin';
import bookingApi from '@/services/booking';
import fileApi from '@/services/file';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Skeleton,
    Typography,
    notification,
} from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { END } from 'redux-saga';

export default function Booking({ jwt }) {
    const router = useRouter();
    const [fetching, setFetching] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminId, setAdminId] = useState('');
    const bookingRef = useRef(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('id');

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
                bookingRef.current = res.bookings;
            }
        } catch (error) {
            console.log(error);
        }
        setFetching(false);
    }, [jwt]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleChange = (value) => {
        setType(value);
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

    const handleSearch = () => {
        if (type === 'id') {
            const result = bookings.filter((booking) =>
                booking.bookingId.toLowerCase().includes(name.toLowerCase())
            );
            setBookings(result);
        } else if (type === 'name') {
            const result = bookings.filter((booking) => {
                const fullName = `${booking.firstName} ${booking.lastName}`;
                return fullName.toLocaleLowerCase().includes(name.toLocaleLowerCase());
            });
            setBookings(result);
        } else if (type === 'email') {
            const result = bookings.filter((booking) =>
                booking.email.toLowerCase().includes(name.toLowerCase())
            );
            setBookings(result);
        }
    };

    const handleClear = () => {
        setBookings(bookingRef.current);
        setName('');
    };

    const handleCreateExcel = async () => {
        const res = await fileApi.createBookingExcel(jwt);
        if (res.status) {
            notification.open({
                message: 'Tạo file excel thành công!',
                description: '',
                placement: 'topRight',
                type: 'success',
            });
        }
    };

    const handleExcel = async () => {
        fetch('http://localhost:6969/file/booking/excel', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            responseType: 'blob',
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Tạo một URL tạm thời cho file blob
                const url = window.URL.createObjectURL(blob);
                // Tạo một thẻ <a> ẩn và click vào nó để tải file
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'booking.xlsx';
                document.body.appendChild(a);
                a.click();
                // Xóa URL tạm thời sau khi tải xong
                window.URL.revokeObjectURL(url);
                // Xóa thẻ <a> đã tạo
                document.body.removeChild(a);
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
    };

    return (
        <LayoutApp>
            {fetching && <Skeleton />}
            {!fetching && (
                <>
                    <Typography.Title level={4}>Lịch sửa đặt phòng</Typography.Title>
                    <Divider />
                    <div>
                        <Form layout="vertical">
                            <Row gutter={24}>
                                <Col xs={24} sm={12} lg={8}>
                                    <Form.Item label="Tìm kiếm">
                                        <Input
                                            placeholder="Nhập Id, email, tên khách hàng "
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            allowClear={true}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} lg={8}>
                                    <Form.Item label="Tìm kiếm theo">
                                        <Select
                                            defaultValue={'id'}
                                            options={[
                                                { value: 'id', label: 'Id' },
                                                { value: 'email', label: 'Email' },
                                                { value: 'name', label: 'Tên khách hàng' },
                                            ]}
                                            onChange={handleChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    className="bg-btn-primary mr-2"
                                    onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </Button>
                                <Button danger onClick={handleClear}>
                                    Hủy
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider />
                    <Button onClick={handleCreateExcel} className="mr-2">
                        Tạo Excel
                    </Button>
                    <Button onClick={handleExcel}>Xuất Excel</Button>
                    <Divider />
                    <BookingTable bookings={bookings} jwt={jwt} />
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
