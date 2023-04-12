import WebLayout from '@/components/Layout/WebLayout';
import { wrapper } from '@/redux/store';
import { Button, Form, Input, notification, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login({ user }) {
    const router = useRouter();
    const [notActive, setNotActive] = useState(false);

    const onFinish = async (values) => {
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            res = await res.json();
            if (res && res.status) {
                notification.open({
                    message: 'Đăng nhập thành công',
                    description: 'Bạn đã đăng nhập thành công!',
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/account');
            } else {
                let description;
                if(res.message === "User not active!")  {
                    description = "Tài khoản chưa kích hoạt!";
                    setNotActive(true);
                }
                notification.open({
                    message: 'Đăng nhập thất bại',
                    description: description,
                    placement: 'topRight',
                    type: 'error',
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WebLayout>
            <div className="flex flex-col items-center mt-12">
                <Typography.Title level={4}>Đăng nhập</Typography.Title>
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
                    autoComplete="off"
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
                        ]}
                    >
                        <Input.Password className="w-80" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="mt-4 w-80 bg-[#4096FF] h-8 px-4"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <Typography>
                    Chưa có tài khoản ? <Link href="/account/register">Đăng ký</Link>
                </Typography>
                {notActive && <Typography>
                    Kích hoạt tài khoản của bạn <Link href="/account/verify">Tại đây</Link>
                </Typography>}
            </div>
        </WebLayout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
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
});
