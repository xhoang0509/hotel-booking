import WebLayout from "@/components/Layout/WebLayout";
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DatePicker, Input } from "antd";
import { useRouter } from "next/router";


export default function Hotel() {
    const router = useRouter();
    const { id } = router.query

    return (
        <WebLayout>
            <div className="flex mb-6">
                <div className="w-[20%]">
                    <div className="bg-[#FEBB02]  mr-4 p-4">
                        <div className="font-bold mb-2 text-lg">Tìm</div>
                        <div className="mb-4">
                            <p className="text-xs">Tên chỗ nghỉ / địa điểm đến</p>
                            <Input className="rounded-none" prefix={<SearchOutlined />} />
                        </div>
                        <div className="mb-4">
                            <p className="text-xs">Ngày nhận phòng</p>
                            <DatePicker className="w-full rounded-none" />
                        </div>
                        <div className="mb-4">
                            <p className="text-xs">Ngày trả phòng</p>
                            <DatePicker className="w-full rounded-none" />
                        </div>
                        <div className="w-full bg-sub-primary text-white rounded-none border-none text-center py-3 cursor-pointer hover:bg-primary" >
                            Tìm
                        </div>
                    </div>
                </div>
                <div className="w-[75%]">
                    <div className="text-lg font-bold">PHOENIX MINH CHÂU HOTEL</div>
                    <p className="text-sm">Đường Ninh Hải, xã Minh Châu, đảo Quan Lạn, huyện Vân Đồn, Quảng Ninh, Việt Nam – Vị trí xuất sắc - hiển thị bản đồ</p>
                </div>
            </div>
            <div className="flex">
                <div className="w-[75%]">
                    <div className="text-sm">
                        <p>Tọa lạc tại tỉnh Quảng Ninh, cách Đảo Quan Lạn 8 km, PHOENIX MINH CHÂU HOTEL có hồ bơi ngoài trời, vườn và tầm nhìn ra hồ bơi. Trong số các tiện nghi của chỗ nghỉ này có nhà hàng, lễ tân 24 giờ, dịch vụ phòng và WiFi miễn phí trong toàn bộ khuôn viên. Khách sạn cung cấp các phòng gia đình.</p>
                        <p>Mỗi phòng nghỉ tại khách sạn đều có sân hiên nhìn ra vườn. Các căn được trang bị phòng tắm riêng, dép đi trong phòng và ga trải giường.</p>
                        <p>Khách nghỉ tại PHOENIX MINH CHÂU HOTEL có thể thưởng thức bữa sáng à la carte.</p>
                        <p>Đảo Ba Mùn nằm trong bán kính 13 km từ chỗ nghỉ trong khi Đảo Cô Tô cách đó 23 km. Sân bay gần nhất là sân bay quốc tế Cát Bi, cách PHOENIX MINH CHÂU HOTEL 87 km.</p>
                    </div>
                </div>
                <div className="w-[20%] bg-[#E4F4FF] p-4 text-sm">
                    <p className="font-bold mb-4">Điểm nổi bật của chỗ nghỉ</p>
                    <p className="font-bold mb-4">Hoàn hảo cho kỳ nghỉ 1 đêm!</p>
                    <div className="text-xs flex my-4">
                        <div className="mx-4"><LocationOnIcon /></div>
                        <div>Địa điểm hàng đầu: Được khách gần đây đánh giá cao (9,9 điểm)</div>
                    </div>
                    <p className="font-bold mb-4">Thông tin về bữa sáng</p>
                    <p className="">Kiểu Á</p>
                    <div className="font-bold mt-4 w-full bg-sub-primary text-white rounded-none border-none text-center py-2 cursor-pointer hover:bg-primary" >
                        Đặt ngay
                    </div>
                    <div className="font-bold mt-4 w-full text-primary rounded-none text-center py-2 cursor-pointer flex items-center justify-center border-2">
                        <HeartOutlined className="mr-2" />
                        Lưu chỗ nghỉ
                    </div>
                    <div className="text-center mt-2 text-xs">
                        Đã lưu vào 19 danh sách
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}