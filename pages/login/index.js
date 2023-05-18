import { wrapper } from '@/redux/store';
import { Button, Card, Form, Input, Layout, Typography, notification, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import signinbg from '@/public/images/img-signin.jpg';

export default function Login() {
    const { Header, Footer, Content } = Layout;
    const { Title } = Typography;
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
                    message: 'Đăng nhập thành công!',
                    description: '',
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/');
            } else {
                notification.open({
                    message: 'Đăng nhập thất bại',
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
        <div className="">
            <Layout className="layout-default layout-signin">
                <Content className="signin">
                    <Row gutter={[24, 0]} justify="space-around" className="flex items-center">
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 6, offset: 2 }}
                            md={{ span: 12 }}
                        >
                            <Title className="mb-15">Đăng nhập</Title>
                            <Title className="font-regular text-muted" level={5}>
                                Nhập email và mật khẩu của bạn để đăng nhập.
                            </Title>
                            <Form
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                className="row-col"
                            >
                                <Form.Item
                                    className="username"
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email của bạn!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" className="px-2" />
                                </Form.Item>

                                <Form.Item
                                    className="username"
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu của bạn!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Mật khẩu" />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: '100%' }}
                                        className="bg-btn-primary"
                                    >
                                        ĐĂNG NHẬP
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col
                            className="sign-img"
                            style={{ padding: 12 }}
                            xs={{ span: 24 }}
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                        >
                            <img src={signinbg.src} alt="" />
                        </Col>
                    </Row>
                </Content>
            </Layout>
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
