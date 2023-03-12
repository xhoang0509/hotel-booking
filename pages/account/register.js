import userApi from '@/services/user';
import { Button, Form, Input, notification, Typography } from 'antd';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            const res = await userApi.register(values);
            if (res && res.data) {
                if (res.data.status) {
                    notification.open({
                        message: 'Registration Successful',
                        description: 'Your account has been created successfully!',
                        placement: 'topRight',
                        type: 'success'
                    });
                    router.push('/account');
                } else {
                    notification.open({
                        message: 'Registration Failed',
                        description: res.data.message,
                        placement: 'topRight',
                        type: 'error'
                    })
                }
            }
        } catch (e) {
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='flex flex-col items-center mt-12'>
            <Typography.Title level={4}>Đăng nhập hoặc tạo tài khoản</Typography.Title>
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
                    className='mt-4'
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
                    <Input.Password className='w-80' />
                </Form.Item>

                <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input className='w-80' />
                </Form.Item>

                <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input className='w-80' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className='mt-4 w-80 bg-[#4096FF] h-8 px-4'>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <Typography>Already account ? <Link href="/account/login">Login</Link></Typography>
        </div>
    )
}