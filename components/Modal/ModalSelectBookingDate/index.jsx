import { Button, Checkbox, DatePicker, Form, Modal, notification } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { LocalStorage } from '@/constants/storage.const';
import { useRouter } from 'next/router';
import bookingApi from '@/services/booking';
import { caculateDay } from '@/helpers/date.helper';
import { formattedPrice } from '@/helpers/price.helper';

const { RangePicker } = DatePicker;

function ModalSelectBookingDate({ isModalOpen, handleCancel, price, location, roomId, jwt }) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [range, setRange] = useState([]);
    const [priceState, setPriceState] = useState({});
    const disabledDate = (current) => {
        // Disable dates earlier than today
        return current && current < moment().startOf('day');
    };
    const [loading, setLoading] = useState(false);
    const [day, setDay] = useState(0);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const data = {
                checkInOutDate: values.checkInOutDate,
                price: priceState,
                roomId,
                locationId: location.id,
            };
            const checkInDate = values.checkInOutDate[0];
            const checkOutDate = values.checkInOutDate[1];
            console.log(caculateDay(checkInDate, checkOutDate));
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
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = async () => {};

    const handleDatePickerChange = () => {
        setRange();
        const values = form.getFieldValue('checkInOutDate');
        if (values) {
            const checkInDate = values[0];
            const checkOutDate = values[1];
            const day = caculateDay(checkInDate, checkOutDate);
            setDay(day);
            setPriceState({
                ...price,
                newPrice: price.newPrice * day,
            });
        } else {
            setDay(0);
        }
    };

    console.log(price);

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
                                onChange={handleDatePickerChange}
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
                        {day > 0 && (
                            <div className="mb-2">
                                <div>Lưu ý: </div>
                                <div>Bạn đã lựa chọn đặt phòng trong {day} ngày</div>
                                <div>Gía phòng 1 ngày: {formattedPrice(price.newPrice)}</div>
                                <p>
                                    Giá tiền của bạn là: {formattedPrice(price.newPrice * day)} (
                                    được tính theo công thức: giá phòng x số ngày ở)
                                </p>
                            </div>
                        )}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-sub-primary"
                                loading={loading}
                            >
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
