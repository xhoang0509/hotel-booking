import BackPage from '@/components/BackPage';
import LayoutApp from '@/components/Layout';
import { dateFormat } from '@/constants/date.const';
import { genders, getGender } from '@/constants/gender.const';
import { authAdmin } from '@/helper/auth.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import adminApi from '@/services/admin';
import ruleApi from '@/services/rule';
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography, notification } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { END } from 'redux-saga';

export default function UserId({ jwt }) {
    const router = useRouter();
    const { id } = router.query;
    const isEdit = useMemo(() => {
        if (id === 'add') {
            return false;
        } else {
            return true;
        }
    }, [id]);
    const [rules, setRules] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');

    const onFinish = async (values) => {
        if (id === 'add') {
            const res = await adminApi.register(values);
            if (res.data.status) {
                notification.open({
                    message: 'Create user successfully',
                    description: res.data.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/account');
            } else {
                notification.open({
                    message: 'Create user failed',
                    description: res.data.message,
                    placement: 'topRight',
                    type: 'error',
                });
            }
        } else {
            const res = await adminApi.update(values, id, jwt);
            if (res.status) {
                notification.open({
                    message: 'Update user successfully',
                    description: res.message,
                    placement: 'topRight',
                    type: 'success',
                });
                router.push('/account');
            } else {
                notification.open({
                    message: 'Update user failed',
                    description: res.message,
                    placement: 'topRight',
                    type: 'error',
                });
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            let res = await ruleApi.getAll(jwt);
            if (res.status) {
                let rules = res.data.rules.map((rule) => {
                    return {
                        value: rule.id,
                        label: rule.name,
                    };
                });
                setRules(rules);
            }
            if (id !== 'add') {
                let resAccount = await adminApi.getOne(id, jwt);
                if (resAccount.status) {
                    const admin = JSON.parse(JSON.stringify(resAccount.admin));
                    if (admin.birthday) {
                        admin.birthday = dayjs(admin.birthday, dateFormat);
                    } else {
                        admin.birthday = dayjs('2000-01-01', dateFormat);
                    }
                    admin.gender = getGender(admin.gender);
                    setData(admin);
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
        setFetching(false);
    }, [jwt, id]);

    return (
        <LayoutApp>
            {fetching && <div>Fetching</div>}
            {!fetching && (
                <>
                    <BackPage href="/user" />
                    <Typography.Title level={4} className="pb-4">
                        Thông tin khách hàng
                    </Typography.Title>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        initialValues={data}
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
                                    <Select
                                        defaultValue={
                                            rules && rules.length > 0 ? rules[0].value : ''
                                        }
                                        options={rules}
                                    />
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
                                    <Input disabled={isEdit} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={
                                        !isEdit && [
                                            {
                                                required: true,
                                                message: 'Mật khẩu không được để trống!',
                                            },
                                        ]
                                    }
                                >
                                    <Input.Password disabled={isEdit} />
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
                                    <DatePicker
                                        defaultValue={dayjs('2000-01-01', dateFormat)}
                                        format={dateFormat}
                                        className="w-full"
                                    />
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
                                    <Select defaultValue={'Nam'} options={genders} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="bg-btn-primary"
                                    >
                                        {id !== 'add' ? 'Chỉnh sửa' : 'Thêm mới'}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </LayoutApp>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let token = req.cookies['adminJWT'] || '';

    if (token) {
        const status = await authAdmin(token);
        if (status) {
            if (!store.getState().admin.id) {
                store.dispatch(SAGA_GET_ADMIN_DATA_ASYNC(token));
                store.dispatch(END);
                await store.sagaTask.toPromise();
            }
        } else {
            res.setHeader(
                'Set-Cookie',
                'adminJWT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
            );
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
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
            jwt: token,
        },
    };
});
