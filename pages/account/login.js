import WebLayout from '@/components/Layout/WebLayout';
import { wrapper } from '@/redux/store';
import { Button, Form, Input, notification, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login({ user }) {
    const router = useRouter();

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
                    message: 'Login Successful',
                    description: 'You have successfully logged in!',
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/account');
            } else {
                notification.open({
                    message: 'Login Failed',
                    description: res.message,
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
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input className="w-80" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
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
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Typography>
                    Do not have an account ? <Link href="/account/register">Register</Link>
                </Typography>
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
