import Gallery from "@/components/Gallery";
import WebLayout from "@/components/Layout/WebLayout";
import locationApi from "@/services/location";
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DatePicker, Input, Typography } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";


export default function Hotel() {
    const { Text, Title } = Typography
    const router = useRouter();
    const { id } = router.query
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            console.log('id: ', id);
            const res = await locationApi.getOne(id);
            if (res.status) {
                setLocation(res.location);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    console.log("location: ", location);

    return (
        <WebLayout>
            {loading && <div>loading...</div>}
            {!loading && location && <>
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
                        <div className="text-lg font-bold">{location.name}</div>
                        <p className="text-sm">{location.address} – Vị trí xuất sắc - hiển thị bản đồ</p>
                        <Gallery images={location.images} />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[75%]">
                        <div className="text-sm">
                            <p>{location.description}</p>
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
                <div>
                    <p className="font-bold text-xl">Đánh giá của khách</p>
                    <div>
                        
                    </div>
                </div>
            </>
            }
        </WebLayout>
    )
}