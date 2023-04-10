import userApi from '@/services/user';
import { Button, Form, Input, notification, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import WebLayout from '@/components/Layout/WebLayout';

export default function Verify() {
    const router = useRouter();
    const { email } = router.query;
    console.log(router);
    const onFinish = async (values) => {
        try {
            const res = await userApi.verify(values);
            if (res) {
                if (res.status) {
                    notification.open({
                        message: 'Xác thực thành công!',
                        description: 'Tài khoản của bạn đã được xác thực!',
                        placement: 'topRight',
                        type: 'success',
                    });
                    router.push('/account/login');
                } else {
                    notification.open({
                        message: 'Xác thực thất bại!',
                        description: res.message,
                        placement: 'topRight',
                        type: 'error',
                    });
                }
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
                <Typography.Title level={4}>Xác thực email</Typography.Title>
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
                    labelAlign="left"
                >
                    <Form.Item
                        className="mt-4"
                        label="Email"
                        name="email"
                        initialValue={email}
                    >
                        <Input className="w-80" disabled />
                    </Form.Item>
                    <Form.Item
                        label="OTP"
                        name="otp"
                        rules={[
                            { required: true, message: "Yêu cầu nhập OTP" }
                        ]}
                    >
                        <Input className="w-80" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="mt-4 bg-[#4096FF] h-8 px-4"
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
