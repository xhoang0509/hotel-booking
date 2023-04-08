import Image from "next/image";
import Star from "../Star";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function Location({ location }) {
    const router = useRouter();

    const handleRouter = useCallback((id) => {
        router.push(`/hotel?id=${id}`)
    }, []);
    return (
        <div>
            <div className="p-4 mb-4 border border-[#ccc] flex">
                <div className="mr-4 relative">
                    <Image
                        src={location.thumbnail}
                        width={200}
                        height={200}
                        onClick={() => handleRouter(location.id)}
                        className="cursor-pointer"
                    />
                    <HeartOutlined className="cursor-pointer absolute top-2 right-2 text-2xl font-bold text-white" />
                </div>
                <div className="flex flex-1 justify-between">
                    <div>
                        <h2 className="font-bold text-lg text-t-primary cursor-pointer" onClick={() => handleRouter(location.id)}>{location.name} <Star number={3} /></h2>
                        <div className="text-xs mb-2">
                            <span className="font-bold text-t-primary underline underline-offset-1 mr-2">{location.address}</span>
                            <span className="font-bold text-t-primary underline underline-offset-1 mr-2">Xem trên bản đồ</span>
                            <span>Cách trung tâm 4.7 km</span>
                        </div>
                        <p className="text-xs max-w-[400px]">
                            {location.description}
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <div className="mr-2">
                                <p>Tuyệt vời</p>
                                <p className="text-xs">7 đánh giá</p>
                            </div>
                            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-bold rounded-tl rounded-br">8.6</div>
                        </div>
                        <div className="bg-[#FEBB02] text-xs p-1 mb-4">Mới trên Datphong.com</div>
                        <div className="bg-t-primary text-center text-white p-2 cursor-pointer">Hiển thị giá</div>
                    </div>
                </div>
            </div>
        </div>
    )
}