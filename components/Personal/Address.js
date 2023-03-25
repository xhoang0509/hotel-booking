import { saveUser } from '@/redux/reducers/user.reducer';
import { Button, Col, Form, Row, Select, Typography, Input } from 'antd';
import { useCallback, useState, useMemo } from 'react';
import userApi from './../../services/user/index';
import { contries } from './../../constants/contries.const';
import { getAddressDetail } from './../../helpers/address.helper';

export default function Address({ isEdit, setIsEdit, jwt, user, dispatch }) {
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);

    const initialValue = useMemo(() => {
        return user.address.split(' | ');
    }, [user]);

    const onFinish = useCallback(
        async (values) => {
            const body = `${values.address} | ${values.city} | ${values.code} | ${values.country}`;
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 500));
                const res = await userApi.update({ address: body }, user.id, jwt);
                dispatch(saveUser({ address: body }));
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
            setActive(!active);
            setIsEdit(false);
        },
        [active, setIsEdit, jwt, user, dispatch]
    );

    const options = contries.map((country) => {
        return { value: country.code, label: country.name };
    });

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
            <Typography.Text className="w-40 text-bold">Địa chỉ</Typography.Text>
            <div className="flex flex-1 justify-between">
                <div className="w-3/4">
                    {active && (
                        <div>
                            <Typography.Text>
                                {user.address ? getAddressDetail(user.address) : 'Nhập địa chỉ'}
                            </Typography.Text>
                        </div>
                    )}

                    {!active && (
                        <Form layout="vertical" form={form} onFinish={onFinish}>
                            <Row gutter={24}>
                                <Col span={18}>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập địa chỉ của bạn',
                                            },
                                        ]}
                                        initialValue={initialValue[0] ? initialValue[0] : ''}
                                    >
                                        <Input placeholder="Tên đường và số nhà/căn hộ" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={9}>
                                    <Form.Item
                                        label="Thị trấn/thành phố"
                                        name="city"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập thị trấn/thành phố',
                                            },
                                        ]}
                                        initialValue={initialValue[1] ? initialValue[1] : ''}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Form.Item
                                        label="Mã bưu điện"
                                        name="code"
                                        initialValue={initialValue[2] ? initialValue[2] : ''}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={18}>
                                    <Form.Item
                                        label="Vùng/quốc gia"
                                        name="country"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập vùng/quốc gia của bạn',
                                            },
                                        ]}
                                        initialValue={initialValue[3] ? initialValue[3] : ''}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Chọn vùng/quốc gia của bạn"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? '')
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                            options={options}
                                        />
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
