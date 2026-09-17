import WebLayout from '@/components/Layout/WebLayout';
import userApi from '@/services/user';
import { Button, Form, Input, notification, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export default function ResetPassword() {
    const router = useRouter();
    const { jwt } = router.query;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const onFinish = useCallback(
        async (values) => {
            try {
                setLoading(true);
                await new Promise((resolver) => setTimeout(resolver, 1000));
                const res = await userApi.resetPassword({ token: jwt, password: values.password });
                if (res) {
                    if (res.status) {
                        notification.open({
                            message: 'Đặt lại mật khẩu thành công!',
                            description: res.message,
                            placement: 'topRight',
                            type: 'success',
                        });
                    } else {
                        notification.open({
                            message: 'Đặt lại mật khẩu thất bại!',
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
            await new Promise((resolver) => setTimeout(resolver, 1000));
            router.push('/account/login');
        },
        [jwt, router]
    );

    const validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
        },
    });
    return (
        <WebLayout>
            <div className="flex flex-col items-center mt-12">
                <Typography.Title level={4}>Đặt mật khẩu mới</Typography.Title>
                <Form
                    form={form}
                    name="reset_password"
                    onFinish={onFinish}
                    scrollToFirstError
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    labelAlign="left"
                >
                    <Form.Item
                        className="mt-4"
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                            {
                                min: 6,
                                message: 'Mật khẩu yêu cầu tối thiểu 6 ký tự!',
                            },
                        ]}
                    >
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-80"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Nhập lại mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                            {
                                min: 6,
                                message: 'Mật khẩu yêu cầu tối thiểu 6 ký tự!',
                            },
                            validateConfirmPassword,
                        ]}
                    >
                        <Input.Password className="w-80" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="mt-4 bg-[#4096FF] h-8 px-4"
                            loading={loading}
                        >
                            Xác thực
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
