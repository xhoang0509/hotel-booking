import BackPage from '@/components/BackPage';
import LayoutApp from '@/components/Layout';
import { storage } from '@/firebase/storage';
import { authAdmin } from '@/helper/auth.helper';
import { formatDateVN } from '@/helper/date.helper';
import { paymentMethod } from '@/helper/payment.helper';
import { formattedPrice } from '@/helper/price.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import bookingApi from '@/services/booking';
import categoryApi from '@/services/category';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Tag,
    Typography,
    message,
    notification,
} from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { END } from 'redux-saga';
import { v4 } from 'uuid';

export default function BookingId({ jwt }) {
    const router = useRouter();
    const { id } = router.query;
    const isEdit = useMemo(() => {
        if (id === 'add') {
            return false;
        } else {
            return true;
        }
    }, [id]);

    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const onFinish = async (values) => {
        if (id === 'add') {
            const res = await categoryApi.create(values, jwt);
            if (res.status) {
                notification.open({
                    message: 'Create user successfully',
                    description: res.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/category');
            } else {
                notification.open({
                    message: 'Create user failed',
                    description: res.message,
                    placement: 'topRight',
                    type: 'error',
                });
            }
        } else {
            const res = await categoryApi.update(
                { name: values.name, image: imageUrl ? imageUrl : data.image },
                id,
                jwt
            );
            if (res.status) {
                notification.open({
                    message: 'Chỉnh sửa thành công!',
                    description: res.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/category');
            } else {
                notification.open({
                    message: 'Chỉnh sửa thất bại!',
                    description: res.message,
                    placement: 'topRight',
                    type: 'error',
                });
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (id !== 'add') {
                let res = await bookingApi.getOne(id, jwt);
                if (res.status) {
                    setData(res.booking);
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
        setFetching(false);
    }, [jwt, id]);

    return (
        <LayoutApp>
            {fetching && <div>Fetching</div>}
            {!fetching && (
                <>
                    <BackPage href="/booking" />
                    <Typography.Title level={4} className="pb-4">
                        Chi tiết phòng đặt
                    </Typography.Title>
                    <Row gutter={24}>
                        <Col span={12} className="text-lg">
                            <Typography.Title level={5}>
                                Mã phòng đặt: {data.bookingId}
                            </Typography.Title>
                            <Divider />
                            <Typography.Title level={5}>Thông tin khách hàng</Typography.Title>
                            <p className="mb-1">Họ tên: {data.firstName + ' ' + data.lastName}</p>
                            <p className="mb-1">Email: {data.email}</p>
                            <p className="mb-1">Giá: {formattedPrice(data.price)}</p>
                            <p className="mb-1">
                                Hình thức thanh toán: {paymentMethod(data.paymentMethod)}
                            </p>
                            <p className="mb-1">
                                Trạng thái:{' '}
                                {data.paymentStatus === '1' ? (
                                    <Tag color="#108ee9">Đã thanh toán</Tag>
                                ) : (
                                    <Tag color="#f50">Chưa thanh toán</Tag>
                                )}
                            </p>
                        </Col>
                        <Col span={12}>
                            <Typography.Title level={5}>Thông tin phòng</Typography.Title>
                            <Divider />
                            <p className="mb-1">Tên phòng: {data.location.name}</p>
                            <p className="mb-1">
                                <span className="mr-4">Hỉnh ảnh:</span>
                                <img src={data.location.thumbnail} />
                            </p>
                            <p className="mb-1">Địa chỉ: {data.location.address}</p>
                            <p className="mb-1">Số điện thoại: {data.location.phone}</p>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Divider />
                            <p className="mb-1">Ngày đặt: {formatDateVN(data.createdAt)}</p>
                            <p className="mb-1 text-primary font-bold">
                                Ngày nhận phòng: {formatDateVN(data.checkInDate)}
                            </p>
                            <p className="mb-1 text-primary font-bold">
                                Ngày trả phòng: {formatDateVN(data.checkOutDate)}
                            </p>
                        </Col>
                    </Row>
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
