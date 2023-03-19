import { saveUser } from '@/redux/reducers/user.reducer';
import { Button, Col, Form, Row, Select, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { optionsGender } from './../../helpers/gender.helper';
import userApi from './../../services/user/index';
import {getGender} from '../../helpers/gender.helper';

export default function Gender({isEdit, setIsEdit}) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState('')
    const onFinish = useCallback(async (values) => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            const res = await userApi.update({ gender }, user.id);
            dispatch(saveUser({ gender }));
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
        setActive(!active);
    }, [user, active, dispatch, gender])
    const onChange = (value) => {
        setGender(value);
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
        <div className="py-2 px-6 flex">
            <Typography.Text className="w-40">Giới tinh</Typography.Text>
            <div className="flex flex-1 justify-between">
                <div className="w-3/4">
                    {active &&
                        <div>
                            <Typography.Text>{user.gender ?  getGender(user.gender) : 'Chọn giới tính'}</Typography.Text>
                        </div>
                    }

                    {!active &&
                        <Form layout="vertical"
                            form={form}
                            onFinish={onFinish}
                        >
                            <Row gutter={24} >
                                <Col span={12}>
                                    <Form.Item label="Giới tinh" name="gender" rules={[{ required: true, message: 'Vui lòng nhập giới tính của bạn' }]}>
                                        <Select
                                            showSearch
                                            placeholder="Nhập giới tính"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            options={optionsGender}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>}
                </div>
                <div>
                    {active && <Button type="link" disabled={isEdit} onClick={handleEditClick}><span className="text-bold" >Chỉnh sửa</span></Button>}
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