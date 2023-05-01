import { Button, Checkbox, DatePicker, Form, Modal, notification } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { LocalStorage } from '@/constants/storage.const';
import { useRouter } from 'next/router';
import bookingApi from '@/services/booking';

const { RangePicker } = DatePicker;

function ModalSelectBookingDate({ isModalOpen, handleCancel, price, location, roomId, jwt }) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [range, setRange] = useState([]);
    const disabledDate = (current) => {
        // Disable dates earlier than today
        return current && current < moment().startOf('day');
    };

    const onFinish = async (values) => {
        const data = {
            checkInOutDate: values.checkInOutDate,
            price,
            roomId,
            locationId: location.id,
        };
        const res = await bookingApi.checkRoom(
            {
                checkInDate: values.checkInOutDate[0],
                checkOutDate: values.checkInOutDate[1],
                roomId,
            },
            jwt
        );
        if (res.status) {
            notification.open({
                message: 'Thêm phòng đặt thành công',
                description: '',
                placement: 'topRight',
                type: 'success',
            });

            localStorage.setItem(LocalStorage.checkout, JSON.stringify(data));
            await new Promise((resolve) => setTimeout(resolve, 1500));
            router.push('/checkout');
        } else {
            notification.open({
                message: 'Đặt phòng thất bại!',
                description: res.message,
                placement: 'topRight',
                type: 'error',
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = async () => {};
    return (
        <Modal
            title="Chọn thời gian chi tiết"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            footer={[]}
        >
            <div className="p-2 rounded">
                <div className="mb-4">
                    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <div className="mb-4">Ngày nhận phòng - trả phòng</div>
                        <Form.Item
                            name={'checkInOutDate'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Yêu chọn ngày!',
                                },
                            ]}
                        >
                            <RangePicker
                                name="check"
                                value={range}
                                onChange={setRange}
                                disabledDate={disabledDate}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            valuePropName="checked"
                            rules={[
                                {
                                    required: true,
                                    message: 'Yêu cầu xác nhận!',
                                },
                            ]}
                        >
                            <Checkbox>Đồng ý đặt phòng!</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="bg-sub-primary">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default ModalSelectBookingDate;
