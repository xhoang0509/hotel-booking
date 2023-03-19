import WebLayout from '@/components/Layout/WebLayout';
import { saveUser } from '@/redux/reducers/user.reducer';
import { wrapper } from '@/redux/store';
import userApi from '@/services/user';
import { Button, Form, Input, notification, Typography } from 'antd';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { withIronSession } from 'next-iron-session';


export default function Login({ user }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            const res = await userApi.login(values);
            if (res && res.data) {
                if (res.data.status) {
                    notification.open({
                        message: 'Login Successful',
                        description: 'You have successfully logged in!',
                        placement: 'topRight',
                        type: 'success'
                    });
                    const user = {
                        ...res.data.user,
                        token: res.data.token
                    }
                    dispatch(saveUser(user));
                    const response = await fetch(' http://localhost:3000/api/login', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ user })
                    });
                    const data = await response.json();
                    
                    router.push('/account');
                } else {
                    notification.open({
                        message: 'Login Failed',
                        description: res.data.message,
                        placement: 'topRight',
                        type: 'error'
                    })
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
            <div className='flex flex-col items-center mt-12'>
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='mt-4 w-80 bg-[#4096FF] h-8 px-4'>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Typography>Do not have an account ? <Link href="/account/register">Register</Link></Typography>
            </div>
        </WebLayout>
    )
}

export const getServerSideProps = withIronSession(
    async function getServerSideProps({ req, res }) {
        const user = req.session.get('user');
        console.log('>>>login.js: user: ', user);
        
        if (user && user.id) {
            res.setHeader('location', '/account');
            res.statusCode = 302;
            res.end();
        }

        if(user && user.id && !req) {
            Router.replace('/account');
        }

    }, {
    password: process.env.SESSION_PASSWORD,
    cookieName: process.env.SESSION_COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false,
    },
});

// export const getServerSideProps = wrapper.getServerSideProps((store) => async({req, res}) => {
    
// })