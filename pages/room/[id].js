import BackPage from '@/components/BackPage';
import LayoutApp from '@/components/Layout';
import { storage } from '@/firebase/storage';
import { authAdmin } from '@/helper/auth.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import locationApi from '@/services/location';
import roomApi from '@/services/room';
import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    Typography,
    Upload,
    message,
    notification,
} from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { END } from 'redux-saga';
import { v4 } from 'uuid';

export default function RoomId({ jwt }) {
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
    const [locations, setLocations] = useState([]);

    const onFinish = async (values) => {
        const data = { ...values, images: [imageUrl] };
        if (id === 'add') {
            const res = await roomApi.create(data, jwt);
            if (res.status) {
                notification.open({
                    message: 'Tạo phòng thành công!',
                    description: res.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/room');
            } else {
                notification.open({
                    message: 'Tạo phòng thất bại!',
                    description: res.message,
                    placement: 'topRight',
                    type: 'error',
                });
            }
        } else {
            const res = await roomApi.update(data, id, jwt);
            if (res.status) {
                notification.open({
                    message: 'Chỉnh sửa thành công!',
                    description: res.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/room');
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
        setFetching(true);
        try {
            if (id !== 'add') {
                let res = await roomApi.getOne(id, jwt);
                if (res.status) {
                    setData(res.location);
                }
            }
            const resLocation = await locationApi.getAll(jwt);
            if (resLocation.status) {
                const options = resLocation.locations.map((city) => {
                    return {
                        value: city.id,
                        label: city.name,
                    };
                });
                setLocations(options);
            }
        } catch (e) {
            console.log(e);
        }
        setFetching(false);
    }, [jwt, id]);

    const handleUpload = useCallback((info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            const imageRef = ref(storage, `images/${info.file.name + v4()}`);
            uploadBytes(imageRef, info.file.originFileObj).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl(url);
                });
            });
            setLoading(false);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            setLoading(false);
        }
    }, []);

    return (
        <LayoutApp>
            {fetching && <div>Fetching</div>}
            {!fetching && (
                <>
                    <BackPage href="/location" />
                    <Typography.Title level={4} className="pb-4">
                        {isEdit ? 'Chỉnh sửa phòng' : 'Thêm phòng'}
                    </Typography.Title>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        initialValues={data}
                    >
                        <Row gutter={24} className="mb-4">
                            <Col span={6}>
                                <Form.Item
                                    label="Tên"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tên không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Hỉnh ảnh"
                                    name="image"
                                    rules={
                                        !imageUrl && [
                                            {
                                                required: true,
                                                message: 'Hình ảnh không được để trống!',
                                            },
                                        ]
                                    }
                                >
                                    <Image
                                        src={imageUrl ? imageUrl : data.thumbnail}
                                        className="w-[200px] h-auto"
                                        width={'200'}
                                        height={'300'}
                                        alt="image"
                                    />
                                </Form.Item>
                                <Upload
                                    name="category_image"
                                    showUploadList={false}
                                    onChange={handleUpload}
                                    action=""
                                    accept="image/*"
                                >
                                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                                </Upload>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    label="Số gường"
                                    name="bed"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Số gường không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Chi tiết giường"
                                    name="bedDetail"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Chi tiết giường không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    label="Giá cũ"
                                    name="oldPrice"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Giá cũ không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Giá mới"
                                    name="newPrice"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Giá mới không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    label="Địa điểm"
                                    name="locationId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Địa điểm không được để trống!',
                                        },
                                    ]}
                                >
                                    {locations && locations.length > 0 && (
                                        <Select
                                            options={locations}
                                            defaultValue={locations[0].value}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="bg-btn-primary"
                                    >
                                        {id !== 'add' ? 'Chỉnh sửa' : 'Thêm mới'}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
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
