import BackPage from '@/components/BackPage';
import LayoutApp from '@/components/Layout';
import { wrapper } from '@/redux/store';
import categoryApi from '@/services/category';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography, Upload, message, notification } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase/storage';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { END } from 'redux-saga';
import Image from 'next/image';

export default function AccountId({ jwt }) {
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
                let res = await categoryApi.getOne(id, jwt);
                if (res.status) {
                    setData(res.category);
                }
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
                    <BackPage href="/category" />
                    <Typography.Title level={4} className="pb-4">
                        {isEdit ? 'Chỉnh sửa thể loại' : 'Thêm thể loại'}
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
                                        src={imageUrl ? imageUrl : data.image}
                                        className="w-[200px] h-auto"
                                        width={'200'}
                                        height={'300'}
                                        alt='image'
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
    let jwt = req.cookies['adminJWT'] || '';

    if (jwt) {
        if (!store.getState().admin.id) {
            store.dispatch(SAGA_GET_ADMIN_DATA_ASYNC(jwt));
            store.dispatch(END);
            await store.sagaTask.toPromise();
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
            jwt,
        },
    };
});
