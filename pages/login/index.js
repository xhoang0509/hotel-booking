import { wrapper } from '@/redux/store';
import { Button, Card, Form, Input, Typography, notification } from 'antd';
import { useRouter } from 'next/router';

export default function Login() {
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
                router.push('/');
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
        <div className="w-screen h-screen flex items-center justify-center bg-[#e6f2fb]">
            <Card className="w-3/12">
                <Typography.Title level={5} className="text-center pb-4">
                    DATPHONG.COM LOGIN
                </Typography.Title>
                <Form
                    name="login"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        labelAlign="left"
                        rules={[
                            {
                                required: true,
                                message: ' Vui lòng nhập email!',
                            },
                        ]}
                        className="pb-4"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        labelAlign="left"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className="bg-btn-primary">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    const jwt = req.cookies['adminJWT'];
    if (jwt) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
});
