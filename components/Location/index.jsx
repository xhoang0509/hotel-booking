import userApi from '@/services/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { HeartIcon, HeartRedIcon } from '../Icons/HeartIcon';
import Star from '../Star';
import { Tag, Typography, notification } from 'antd';
import { formattedPrice } from '@/helpers/price.helper';

export default function Location({ jwt, location, favorites }) {
    const router = useRouter();
    const user = useSelector((state) => state.user);

    const handleRouter = useCallback((id) => {
        router.push(`/hotel?id=${id}`);
    }, []);

    const handleAddFavorite = useCallback(
        async (id) => {
            const data = {
                userId: user.id,
                locationId: id,
            };
            try {
                if (!user.id || !jwt) {
                    notification.open({
                        message: 'Thêm địa điểm thất bại',
                        description: 'Bạn cần đăng nhập để thêm địa điểm vào bộ sưu tập của mình!',
                        placement: 'topRight',
                        type: 'error',
                    });
                    return;
                }
                const res = await userApi.addFavorite(data, jwt);
                if (res.status) {
                    notification.open({
                        message: 'Thêm địa điểm thành công',
                        description: 'Bạn đã thêm thành công vào bộ sưu tập của mình!',
                        placement: 'topRight',
                        type: 'success',
                    });
                } else if (res.message === 'User favorited it!') {
                    notification.open({
                        message: 'Thêm địa điểm thất bại',
                        description: 'Địa điểm đã có trong bộ sưu tập của bạn!',
                        placement: 'topRight',
                        type: 'error',
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        [jwt]
    );

    const isFavorite =
        favorites && favorites.length > 0
            ? favorites.findIndex((favorite) => favorite.locationId === location.id)
            : -1;

    const handleDetailClick = useCallback((id) => {
        router.push(`/hotel?id=${id}`);
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
                    {isFavorite === -1 && (
                        <div onClick={() => handleAddFavorite(location.id)}>
                            <HeartIcon className="cursor-pointer absolute top-2 right-2 text-2xl font-bold text-white z-10" />
                        </div>
                    )}
                    {isFavorite !== -1 && (
                        <HeartRedIcon className="cursor-pointer absolute top-2 right-2 text-2xl font-bold text-white" />
                    )}
                </div>
                <div className="flex flex-1 justify-between">
                    <div>
                        <h2
                            className="font-bold text-lg text-t-primary cursor-pointer"
                            onClick={() => handleRouter(location.id)}
                        >
                            {location.name} <Star number={3} />
                        </h2>
                        <div className="text-xs mb-2">
                            <span className="font-bold text-t-primary underline underline-offset-1 mr-2">
                                {location.address}
                            </span>
                            <span className="font-bold text-t-primary underline underline-offset-1 mr-2">
                                Xem trên bản đồ
                            </span>
                            <span>Cách trung tâm 4.7 km</span>
                        </div>
                        <span className="mb-2 bg-[#f7f7f7] p-2 inline-block">
                            <span className="text-sm line-through mr-2">
                                {formattedPrice(location.oldPrice)}
                            </span>
                            <span className="text-lg text-red font-bold">
                                {formattedPrice(location.newPrice)}
                            </span>
                        </span>
                        <div className="mb-4">
                            <Tag color="#008009">Ưu Đãi Mùa Du Lịch</Tag>
                        </div>
                        <div className="max-w-[400px]">
                            <p className="text-sm">Tiện nghi: </p>
                            {location.convenients.length > 0 &&
                                location.convenients.map((convenient, index) => {
                                    return (
                                        <Tag className="mb-2" color="magenta" key={index}>
                                            {convenient}
                                        </Tag>
                                    );
                                })}
                        </div>
                        <p className="text-xs max-w-[400px]">{location.description}</p>
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <div className="mr-2">
                                <p>Tuyệt vời</p>
                                <p className="text-xs">7 đánh giá</p>
                            </div>
                            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-bold rounded-tl rounded-br">
                                8.6
                            </div>
                        </div>
                        <div className="bg-[#FEBB02] text-xs p-1 mb-4">Mới trên Datphong.com</div>
                        <div
                            className="bg-t-primary text-center text-white p-2 cursor-pointer mb-2"
                            onClick={() => handleDetailClick(location.id)}
                        >
                            Xem chi tiết
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
