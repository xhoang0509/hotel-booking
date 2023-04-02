import cityApi from '@/services/city';
import { CustomerServiceOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FaMotorcycle, FaUmbrellaBeach } from 'react-icons/fa';

export default function SearchCategory() {
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState(() => [
        {
            id: 1,
            name: 'Bãi biển',
            icon: <FaUmbrellaBeach />,
        },
        {
            id: 2,
            name: 'Thiên nhiên',
            icon: <FaMotorcycle />,
        },
        {
            id: 3,
            name: 'Thành phố',
            icon: <HomeOutlined />,
        },
        {
            id: 4,
            name: 'Lãng mạng',
            icon: <HeartOutlined />,
        },
        {
            id: 5,
            name: 'Thư giãn',
            icon: <CustomerServiceOutlined />,
        },
    ]);
    const [active, setActive] = useState(1);

    const handleClick = useCallback((id) => {
        setActive(id);
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const res = await cityApi.search(active);
            if (res.status) {
                setCities(res.cities);
            }
        } catch (e) {
            console.log(e);
        }
    }, [active]);

    useEffect(() => {
        fetchData();
    }, [fetchData, active]);

    return (
        <React.Fragment>
            <div className="flex my-2">
                {data.map((item) => {
                    const classes = item.id === active ? 'bg-primary text-white' : '';
                    return (
                        <Button
                            className={`rounded-full flex items-center mr-2 ${classes}`}
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                        >
                            {item.icon}&nbsp;
                            <span>{item.name}</span>
                        </Button>
                    );
                })}
            </div>
            <div className="flex flex-wrap ">
                {loading && <span>loading...</span>}
                {!loading &&
                    cities.map((category) => {
                        return (
                            <div
                                key={category.id}
                                className="w-[15%] px-2 py-2 mr-2 bg-gray-200 rounded-lg cursor-pointer"
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
        </React.Fragment>
    );
}
