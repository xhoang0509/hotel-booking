import WebLayout from "@/components/Layout/WebLayout";
import Location from "@/components/Location";
import locationApi from "@/services/location";
import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Select } from "antd";
import { useCallback, useEffect, useState } from "react";

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        const res = await locationApi.getAll();
        if (res.status) {
            setLocations(res.locations);
        }
    }, []);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    console.log(locations)

    return <WebLayout>
        <div className="flex">
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
            <div className="w-[74%] p-4">
                <div className="font-bold text-lg mb-4">Hà Nội: tìm thấy 2.276 chỗ nghỉ</div>
                <div className="mb-4">
                    <div className="text-sm mb-2">Sắp xếp theo: </div>
                    <Select
                        defaultValue="Lựa chọn hàng đầu của chúng tôi"
                        className="w-[350px] rounded-full"
                        onChange={handleChange}
                        options={[
                            {
                                value: 'jack',
                                label: 'Lựa chọn hàng đầu của chúng tôi',
                            },
                            {
                                value: 'jack',
                                label: 'Ưu tiên nhà & căn hộ',
                            },
                            {
                                value: 'lucy',
                                label: 'Xếp hạng chỗ nghỉ (cao đến thấp)',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'Xếp hạng chỗ nghỉ (thấp đến cao)',
                            },
                            {
                                value: 'disabled',
                                label: 'Khoảng cách từ trung tâm thành phố',
                            },
                            {
                                value: 'disabled',
                                label: 'Khoảng cách từ trung tâm thành phố',
                            },
                            {
                                value: 'disabled',
                                label: 'Được đánh giá hàng đầu',
                            },
                            {
                                value: 'disabled',
                                label: 'Ưu tiên giảm giá Genius',
                            },
                        ]}
                    />
                </div>
                {
                    !loading && locations.map(location => {
                        return <Location key={location.id} location={location} />
                    })

                }
            </div>
        </div>
    </WebLayout>
}