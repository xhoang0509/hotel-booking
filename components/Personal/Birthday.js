import { getDateDetail } from '@/helpers/date.helper';
import { Button, Col, DatePicker, Form, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { saveUser } from './../../redux/reducers/user.reducer';
import userApi from './../../services/user/index';

export default function Birthday({ isEdit, setIsEdit, jwt, user, dispatch }) {
    const [form] = Form.useForm();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [birthday, setBirthday] = useState('');

    const dateFormat = 'YYYY-MM-DD';
    const defaultValue = useMemo(() => {
        if (user && user.birthday) {
            return dayjs(user.birthday, dateFormat);
        } else {
            return dayjs('2000-01-01', dateFormat);
        }
    }, [user]);

    const onFinish = useCallback(
        async (values) => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));
                const res = await userApi.update({ birthday }, user.id, jwt);
                dispatch(saveUser({ birthday }));
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
            setActive(!active);
            setIsEdit(false);
        },
        [user, active, dispatch, birthday, setIsEdit, jwt]
    );

    const onChange = (date, dateString) => {
        setBirthday(dateString);
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
            <Typography.Text className="w-40 text-bold">Ngày sinh</Typography.Text>
            <div className="flex flex-1 justify-between">
                <div className="w-3/4">
                    {active && (
                        <div>
                            <Typography.Text>
                                {user.birthday
                                    ? getDateDetail(user.birthday)
                                    : 'Nhập ngày sinh của bạn'}
                            </Typography.Text>
                        </div>
                    )}

                    {!active && (
                        <Form layout="vertical" form={form} onFinish={onFinish}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="birthday"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập ngày của bạn',
                                            },
                                        ]}
                                    >
                                        <DatePicker
                                            onChange={onChange}
                                            defaultValue={defaultValue}
                                            format={dateFormat}
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
