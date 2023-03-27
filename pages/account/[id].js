import LayoutApp from '@/components/Layout';
import { Typography, Button, Checkbox, Form, Input, Col, Row } from 'antd';
import { useState , useEffect} from 'react';
import { wrapper } from '@/redux/store';
import { END } from 'redux-saga';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import ruleApi from '@/services/rule';


export default function AccountId({jwt}) {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        setLoading(true);
        try {
            (async() => {
                let res = await ruleApi.getAll(jwt);
                if(res.status) {
                    setRules(res.data.rules);
                }
            })()
        } catch(e) {
            console.log(e);
        }
        setLoading(false);
    }, [jwt]);

    console.log('rules: ', rules);

    return (
        <LayoutApp>
            <Typography.Title level={4} className="pb-4">
                Thêm nhân viên mới
            </Typography.Title>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Row gutter={24} className="mb-4">
                    <Col span={6}>
                        <Form.Item
                            label="Họ"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Họ không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        
                    </Col>
                                <Col span={6}>
                                <Form.Item
                                        label="Tên"
                                        name="firstName"
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
                            label="Chức vụ"
                            name="ruleId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chức vụ không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} className="mb-4">
                    <Col span={6}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Mật khẩu không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Số điện thoại không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24} className="mb-4">
                <Col span={6}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Địa chỉ không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Ngày sinh"
                            name="birthday"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ngày sinh không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Giới tính"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Giới tính không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item>
                             <Button type="primary" htmlType="submit">Thêm mới</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
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
