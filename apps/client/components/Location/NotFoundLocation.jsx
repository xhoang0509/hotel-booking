import { Input, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

function NotFoundLocation() {
    return (
        <div className="flex items-center flex-col">
            <div className="text-4xl font-bold mb-2">Không tìm thấy địa điểm</div>
            <div className="text-[#838383] mb-4">
                Chuyện thường thôi! Chúng tôi sẽ giúp bạn tìm được thứ mình cần ngay!
            </div>
            <div className="p-2 w-[600px] bg-yellow-bg rounded">
                <div className="mb-4">
                    <div>Điểm đến, tên chỗ nghỉ hoặc địa chỉ:</div>
                    <Input />
                </div>
                <div className="mb-4 flex justify-between gap-4">
                    <div className="flex-1">
                        <div>Ngày nhận phòng:</div>
                        <RangePicker />
                    </div>
                    <div className="flex-1">
                        <div>Ngày trả phòng:</div>
                        <RangePicker />
                    </div>
                </div>
                <div className="flex justify-end ">
                    <button className="bg-t-primary text-center text-white p-2 px-3 cursor-pointer mb-2 rounded">
                        Tìm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundLocation;
