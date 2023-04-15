import { Modal, DatePicker, Button } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';

function ModalSelectBookingDate({ isModalOpen, handleOk, handleCancel, loadingBooking }) {
    return (
        <Modal
            title="Chọn thời gian chi tiết"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            footer={[
                <Button key="submit" type="primary" loading={loadingBooking} onClick={handleOk} className='bg-t-primary'>
                    Xác nhận
                </Button>
            ]}
        >
            <div className="p-2 rounded">
                <div className="mb-4 flex justify-between gap-4">
                    <div className="flex-1">
                        <div>Ngày nhận phòng:</div>
                        <DatePicker locale={viVN} />
                    </div>
                    <div className="flex-1">
                        <div>Ngày trả phòng:</div>
                        <DatePicker />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalSelectBookingDate;
