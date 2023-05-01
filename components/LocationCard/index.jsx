import { useCallback } from 'react';
import LocationIcon from '../Icons/Location';
import { useRouter } from 'next/router';
import { formattedPrice } from '@/helpers/price.helper';

function LocationCard({ location }) {
    const router = useRouter();
    const handleNameClick = useCallback(
        (id) => {
            router.push(`/hotel?id=${id}`);
        },
        [router]
    );

    const handleRedirect = (id) => {
        router.push(`/hotel?id=${id}`);
    };

    return (
        <div className="bg-[#F2F2F2]">
            <img
                src={location.thumbnail}
                alt=""
                className="w-[250px] mb-2 cursor-pointer"
                onClick={() => handleNameClick(location.id)}
            />
            <p
                className="text-t-primary font-bold p-2 cursor-pointer"
                onClick={() => handleNameClick(location.id)}
            >
                {location.name}
            </p>
            <div className="w-full h-[1px] bg-[#ccc]"></div>
            <div className="flex items-center">
                <LocationIcon className="w-[16px] h-[16px] inline-block" />
                <p className="text-xs p-2">{location.address}</p>
            </div>
            <div className="w-full h-[1px] bg-[#ccc]"></div>
            <div className="p-2 flex">
                <div className="p-1 bg-primary text-white mr-2 rounded-tl-lg rounded-br-lg">
                    9.1
                </div>
                <div className="text-xs">
                    <p>Tuyệt hảo</p>
                    <p>65 đánh giá</p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-[#ccc]"></div>
            <div className="mx-4 my-8 text-sm mb-12">
                <p className="text-end font-light text-xs">1 đêm, 2 người lớn</p>
                <p className="text-end">
                    <span className="text-red mr-2 line-through">
                        {formattedPrice(location.oldPrice)}
                    </span>
                    <span className="text-xl">{formattedPrice(location.newPrice)}</span>
                </p>
                <p className="text-end font-light text-xs">Đã bao gồm thuế và phí</p>
            </div>
            <div className="w-full h-[1px] bg-[#ccc]"></div>
            <div className="m-2">
                <button
                    className="bg-primary text-white w-full p-2"
                    onClick={() => handleRedirect(location.id)}
                >
                    Xem chỗ nghỉ
                </button>
            </div>
        </div>
    );
}

export default LocationCard;
