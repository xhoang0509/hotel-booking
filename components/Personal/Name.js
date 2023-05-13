import { saveUser } from '@/redux/reducers/user.reducer';
import { Button, Col, Form, Input, Row, Typography, notification } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from './../../services/user/index';

export default function Name({ isEdit, setIsEdit, jwt }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);

    const onFinish = useCallback(
        async (values) => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 500));
                const res = await userApi.update(values, user.id, jwt);
                if (res.status) {
                    dispatch(saveUser({ ...values }));
                    notification.open({
                        message: 'Cập nhật thông tin khách hàng thành công!',
                        description: '',
                        placement: 'topRight',
                        type: 'success',
                    });
                }
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
            setActive(!active);
            setIsEdit(false);
        },
        [user, active, dispatch, jwt, setIsEdit]
    );

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleEditClick = () => {
        if (!isEdit) {
            setActive(!active);
            setIsEdit(true);
        }
    };

    const handleCancelClick = () => {
        setActive(!active);
        setIsEdit(false);
    };

    return (
        <div className="py-2 px-6 flex">
            <Typography.Text className="w-40 text-bold">Tên</Typography.Text>
            <div className="flex flex-1 justify-between">
                <div className="w-3/4">
                    {active && (
                        <Typography.Text>{`${user.firstName} ${user.lastName}`}</Typography.Text>
                    )}
                    {!active && (
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{ firstName: user.firstName, lastName: user.lastName }}
                        >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên"
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên của bạn',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Họ"
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên của bạn',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </div>
                <div>
                    {active && (
                        <Button type="link" disabled={isEdit} onClick={handleEditClick}>
                            <span className="text-bold">Chỉnh sửa</span>
                        </Button>
                    )}
                    {!active && (
                        <div className="flex flex-col">
                            <Button type="link" htmlType="submit" onClick={handleCancelClick}>
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                className="bg-sub-primary mt-6"
                                onClick={() => form.submit()}
                                loading={loading}
                            >
                                Lưu
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
