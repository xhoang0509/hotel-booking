import { saveUser } from '@/redux/reducers/user.reducer';
import { Button, Col, Form, Row, Select, Typography, Input } from 'antd';
import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from './../../services/user/index';
import { contries } from './../../constants/contries.const';

export default function Address({isEdit, setIsEdit}) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [country, setcountry] = useState('')
    const onFinish = useCallback(async (values) => {
        console.log({values});
        // try {
        //     setLoading(true);
        //     await new Promise(resolve => setTimeout(resolve, 1500));
        //     const res = await userApi.update({ country }, user.id);
        //     dispatch(saveUser({ country }));
        // } catch (e) {
        //     console.log(e);
        // }
        // setLoading(false);
        // setActive(!active);
    }, [user, active, dispatch, country])
    const onChange = (value) => {
        setcountry(value);
    };

    const options =  contries.map(country => {
            return { value: country.code, label: country.name }
    })

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
            <Typography.Text className="w-40">Địa chỉ</Typography.Text>
            <div className="flex flex-1 justify-between">
                <div className="w-3/4">
                    {active &&
                        <div>
                            <Typography.Text>{user.address ? user.address : 'Nhập địa chỉ'}</Typography.Text>
                        </div>
                    }

                    {!active &&
                        <Form layout="vertical"
                            form={form}
                            onFinish={onFinish}
                        >
                            <Row gutter={24} >
                                <Col span={18}>
                                    <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn' }]}>
                                        <Input placeholder="Tên đường và số nhà/căn hộ" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={9}>
                                    <Form.Item label="Thị trấn/thành phố" name="city" rules={[{ required: true, message: 'Vui lòng nhập thị trấn/thành phố' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item label="Mã bưu điện" name="code">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={18}>
                                    <Form.Item label="Vùng/quốc gia" name="country" rules={[{ required: true, message: 'Vui lòng nhập vùng/quốc gia của bạn' }]}>
                                        <Select
                                            showSearch
                                            placeholder="Chọn vùng/quốc gia của bạn"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={options}
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