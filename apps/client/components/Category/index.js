import categoryApi from '@/services/category';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const res = await categoryApi.getAll();
            if (res.status) {
                setCategories(res.categories);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div className="flex flex-wrap justify-between">
            {loading && <span>loading...</span>}
            {!loading &&
                categories.map((category) => {
                    return (
                        <div
                            key={category.id}
                            className="w-[15%] px-2 py-2 mr-2 bg-gray-200 rounded-lg cursor-pointer"
                        >
                            <Image
                                src={category.images}
                                className="w-[170px] h-[136px] object-cover"
                                width={'170'}
                                height={'136'}
                                alt={category.name}
                            />
                            <p level={5} className="text-base font-bold mt-2">
                                {category.name}
                            </p>
                        </div>
                    );
                })}
        </div>
    );
}
