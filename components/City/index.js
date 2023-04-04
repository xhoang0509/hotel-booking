import { useCallback, useEffect, useState } from 'react';
import cityApi from '@/services/city';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function City() {
    const router = useRouter();
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const res = await cityApi.getAll();
            if (res.status) {
                setCities(res.cities);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleClick = useCallback(() => {
        router.push('/search');
    }, []);

    return (
        <div className="flex flex-wrap">
            {loading && <span>loading...</span>}
            {!loading &&
                cities.map((category) => {
                    return (
                        <div
                            key={category.id}
                            className="w-[15%] px-2 py-2 mr-2 bg-gray-200 rounded-lg cursor-pointer"
                            onClick={handleClick}
                        >
                            <Image
                                src={category.image}
                                className="w-[170px] h-[136px] object-cover"
                                width={'170'}
                                height={'136'}
                                alt={category.name}
                            />
                            <p level={5} className="text-base font-bold mt-2">
                                {category.name}
                            </p>
                            {/* <Typography.Text>{city.count.toLocaleString('en-US')} chỗ nghỉ</Typography.Text> */}
                        </div>
                    );
                })}
        </div>
    );
}
