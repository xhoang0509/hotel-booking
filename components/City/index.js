import { useCallback, useEffect, useState } from 'react';
import cityApi from '@/services/city';

export default function City() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
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

    return (
        <div className="flex flex-wrap justify-between">
            {loading && <span>loading...</span>}
            {!loading &&
                cities.map((category) => {
                    return (
                        <div
                            key={category.id}
                            className="w-[15%] px-2 py-2 mr-2 bg-gray-200 rounded-lg cursor-pointer"
                        >
                            <img
                                src={category.image}
                                className="w-[170px] h-[136px] object-cover"
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
