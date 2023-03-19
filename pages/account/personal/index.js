import WebLayout from "@/components/Layout/WebLayout";
import Phone from "@/components/Personal/Phone";
import Birthday from "@/components/Personal/Birthday";
import Nationality from "@/components/Personal/Nationality";
import Gender from "@/components/Personal/Gender";
import Address from "@/components/Personal/Address";
import { saveUser } from "@/redux/reducers/user.reducer";
import { BellOutlined, CreditCardOutlined, LockOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import { Card, Typography, Divider, Button, Form, Input, Row, Col } from "antd";
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userApi from './../../../services/user/index';

const gridStyle = {
    width: '100%',
};

const list = [
    {
        icon: <UserAddOutlined />,
        title: 'Thông tin cá nhân'
    },

    {
        icon: <SettingOutlined />,
        title: 'Các tùy chọn'
    },
    {
        icon: <LockOutlined />,
        title: 'An toàn và bảo mật'
    },
    {
        icon: <CreditCardOutlined />,
        title: 'Thông tin thanh toán'
    },
    {
        icon: <BellOutlined />,
        title: 'Thông báo email'
    },

]

export default function Personal() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = useCallback(async (values) => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            const res = await userApi.update(values, user.id);
            dispatch(saveUser({ ...values }));
            setActive(!active);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
        setIsEdit(false);
    }, [user, active, dispatch])
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
        <WebLayout>
            <div className="flex">
                <Card className="w-1/4 mr-4" >
                    {
                        list.map((item, index) => {
                            return (
                                <Card.Grid style={gridStyle} key={index}>
                                    <span className="text-lg mr-4">{item.icon}</span>
                                    <span>{item.title}</span>
                                </Card.Grid>
                            )
                        })
                    }
                </Card>
                <div className="flex-1">
                    <Typography.Text className="text-bold text-4xl">Thông tin cá nhân</Typography.Text>
                    <Typography.Text className="text-base block mt-4">Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.</Typography.Text>
                    <Divider />
                    <div className="py-2 px-6 flex">
                        <Typography.Text className="w-40">Tên</Typography.Text>
                        <div className="flex flex-1 justify-between">
                            <div className="w-3/4">
                                {active && <Typography.Text>{`${user.firstName} ${user.lastName}`}</Typography.Text>}
                                {!active &&
                                    <Form layout="vertical"
                                        form={form}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        initialValues={{ firstName: user.firstName, lastName: user.lastName }}
                                    >
                                        <Row gutter={24} >
                                            <Col span={12}>
                                                <Form.Item label="Tên" name="firstName" rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Họ" name="lastName" rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>}
                            </div>
                            <div>
                                {active && <Button type="link" disabled={isEdit}  onClick={handleEditClick}><span className="text-bold">Chỉnh sửa</span></Button>}
                                {!active &&
                                    <div className="flex flex-col">
                                        <Button type="link" htmlType="submit" onClick={handleCancelClick}>Hủy</Button>
                                        <Button type="primary" className="bg-sub-primary mt-6" onClick={() => form.submit()} loading={loading}>Lưu</Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <Phone isEdit={isEdit} setIsEdit={setIsEdit}/>
                    <Divider />
                    <Birthday isEdit={isEdit} setIsEdit={setIsEdit}/>
                    <Divider />
                    <Nationality isEdit={isEdit} setIsEdit={setIsEdit}/>
                    <Divider/>
                    <Gender isEdit={isEdit} setIsEdit={setIsEdit}/>
                    <Divider/>
                    <Address isEdit={isEdit} setIsEdit={setIsEdit}/>
                </div>
            </div>
        </WebLayout >
    )
}