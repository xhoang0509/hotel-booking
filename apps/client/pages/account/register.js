import userApi from '@/services/user';
import { Button, Form, Input, notification, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WebLayout from '@/components/Layout/WebLayout';
import { useState } from 'react';

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await userApi.register(values);
            if (res && res.data) {
                if (res.data.status) {
                    notification.open({
                        message: 'Đăng kí thành công!',
                        description: 'Tài khoản của bạn đã được đăng kí thành công!',
                        placement: 'topRight',
                        type: 'success',
                    });
                    router.push(`/account/verify?email=${values.email}`);
                } else {
                    notification.open({
                        message: 'Đăng kí thất bại!',
                        description: res.data.message,
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
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <WebLayout>
            <div className="flex flex-col items-center mt-12">
                <Typography.Title level={4}>Đăng ký tài khoản</Typography.Title>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        className="mt-4"
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                    >
                        <Input className="w-80" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                            {
                                min: 6,
                                message: 'Yêu cầu tối thiểu 6 ký tự!',
                            },
                        ]}
                    >
                        <Input.Password className="w-80" />
                    </Form.Item>
                    <Form.Item
                        label="Họ"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ!',
                            },
                        ]}
                    >
                        <Input className="w-80" />
                    </Form.Item>
                    <Form.Item
                        label="Tên"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên!',
                            },
                        ]}
                    >
                        <Input className="w-80" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="mt-4 w-80 bg-[#4096FF] h-8 px-4"
                            loading={loading}
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
                <Typography>
                    Đã có tài khoản ? <Link href="/account/login">Đăng nhập</Link>
                </Typography>
            </div>
        </WebLayout>
    );
}

export async function getServerSideProps({ req, res }) {
    const jwt = req.cookies['bookingJWT'];
    if (jwt) {
        return {
            redirect: {
                destination: '/account',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
