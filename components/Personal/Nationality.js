import { saveUser } from '@/redux/reducers/user.reducer';
import { Button, Col, Form, Row, Select, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contries, getContry } from '../../constants/contries.const';
import userApi from './../../services/user/index';

export default function Nationality({ isEdit, setIsEdit, jwt }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [nationality, setNationality] = useState('');

    const onFinish = useCallback(
        async (values) => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 500));
                const res = await userApi.update({ nationality }, user.id, jwt);
                dispatch(saveUser({ nationality }));
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
            setActive(!active);
            setIsEdit(false);
        },
        [user, active, dispatch, nationality, jwt, setIsEdit]
    );
    const onChange = (value) => {
        setNationality(value);
    };
    const options = contries.map((contry) => {
        return { value: contry.code, label: contry.name };
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
            <Typography.Text className="w-40 text-bold">Quốc tịch</Typography.Text>
            <div className="flex flex-1 justify-between">
                <div className="w-3/4">
                    {active && (
                        <div>
                            <Typography.Text>
                                {user.nationality
                                    ? getContry(user.nationality).name
                                    : 'Chọn vùng/quốc gia của bạn'}
                            </Typography.Text>
                        </div>
                    )}

                    {!active && (
                        <Form layout="vertical" form={form} onFinish={onFinish}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Quốc tịch"
                                        name="nationality"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn vùng/quốc gia của bạn',
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Chọn vùng/quốc gia của bạn"
                                            optionFilterProp="children"
                                            onChange={onChange}
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
