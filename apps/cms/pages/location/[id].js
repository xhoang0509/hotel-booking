import BackPage from '@/components/BackPage';
import LayoutApp from '@/components/Layout';
import { storage } from '@/firebase/storage';
import { authAdmin } from '@/helper/auth.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import cityApi from '@/services/city';
import locationApi from '@/services/location';
import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Divider,
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

const { TextArea } = Input;

export default function LocationId({ jwt }) {
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
    const [cities, setCities] = useState([]);

    const onFinish = async (values) => {
        const data = { ...values, images: [imageUrl], thumbnail: imageUrl };
        if (id === 'add') {
            const res = await locationApi.create(data, jwt);
            if (res.status) {
                notification.open({
                    message: 'Tạo địa điểm thành công',
                    description: res.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/location');
            } else {
                notification.open({
                    message: 'Tạo địa điểm thất bại',
                    description: res.message,
                    placement: 'topRight',
                    type: 'error',
                });
            }
        } else {
            const res = await locationApi.update(data, id, jwt);
            if (res.status) {
                notification.open({
                    message: 'Chỉnh sửa thành công!',
                    description: res.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/location');
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
                let res = await locationApi.getOne(id, jwt);
                if (res.status) {
                    setData(res.location);
                }
            }
            const resCity = await cityApi.getAll(jwt);
            if (resCity.status) {
                const options = resCity.cities.map((city) => {
                    return {
                        value: city.id,
                        label: city.name,
                    };
                });
                setCities(options);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
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
                        {isEdit ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm'}
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
                        <Row>
                            {data.images && data.images.length > 0 && (
                                <div>
                                    Tất cả hình ảnh:
                                    <Divider />
                                    {data.images.map((image, index) => {
                                        return (
                                            <img
                                                key={index}
                                                src={image}
                                                className="max-w-[200px] m-2 inline-block"
                                            />
                                        );
                                    })}
                                    <Divider />
                                </div>
                            )}
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Địa chỉ không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
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
                                <Form.Item label="Mô tả" name="description">
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Số điện thoại không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Thành phố"
                                    name="cityId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thành phố không được để trống!',
                                        },
                                    ]}
                                >
                                    {cities && cities.length > 0 && (
                                        <Select options={cities} defaultValue={cities[0].value} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Ghi chú"
                                    name="notes"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mô tả không được để trống!',
                                        },
                                    ]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tiện ghi"
                                    name="convenients"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tiện ghi không được để trống!',
                                        },
                                    ]}
                                >
                                    <Input />
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
