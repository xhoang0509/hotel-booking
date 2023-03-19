import { Row } from 'antd';
import { Col } from 'antd';
import { Typography, Form, Input, Button } from 'antd';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from './../../services/user/index';
import { saveUser } from './../../redux/reducers/user.reducer';

export default function Phone({isEdit, setIsEdit}) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);

    const onFinish = useCallback(async (values) => {

        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            const res = await userApi.update(values, user.id);
            dispatch(saveUser({ ...values }));
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
        setActive(!active);
        setIsEdit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, active, dispatch])

    const handleEditClick=  () => {
        if(!isEdit) {
            setActive(!active);
            setIsEdit(true);
        }
    }

    const handleCancelClick=  () => {
        setActive(!active);
        setIsEdit(false);
    }
    return (
        <div className="py-2 px-6 flex">
            <Typography.Text className="w-40">Số điện thoại</Typography.Text>
            <div className="flex flex-1 justify-between">
                <div className="w-3/4">
                    {active &&
                        <div>
                            <Typography.Text>{user.phone ? user.phone : 'Bạn chưa cập nhận số điện thoại'}</Typography.Text>
                            <Typography.Paragraph>Chỗ nghỉ hoặc điểm tham quan bạn đặt có thể liên hệ qua số này.</Typography.Paragraph>
                        </div>
                    }

                    {!active &&
                        <Form layout="vertical"
                            form={form}
                            onFinish={onFinish}
                        >
                            <Row gutter={24} >
                                <Col span={12}>
                                    <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>}
                </div>
                <div>
                    {active && <Button type="link" disabled={isEdit} onClick={isEdit ? null : handleEditClick}><span className="text-bold">Chỉnh sửa</span></Button>}
                    {!active &&
                        <div className="flex flex-col">
                            <Button type="link" htmlType="submit" onClick={handleCancelClick}>Hủy</Button>
                            <Button type="primary" className="bg-sub-primary mt-6" onClick={() => form.submit()} loading={loading}>Lưu</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}