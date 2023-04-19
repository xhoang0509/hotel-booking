import WebLayout from '@/components/Layout/WebLayout';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import locationApi from '@/services/location';
import userApi from '@/services/user';
import { Breadcrumb, Col, Row } from 'antd';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

export default function Checkout({ jwt }) {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [search, setSearch] = useState('');
    const locationRef = useRef([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(async () => {
        const res = await locationApi.getAll();
        if (res.status) {
            setLocations(res.locations);
            locationRef.current = res.locations;
        }
        if (user && user.id) {
            const resFavorite = await userApi.getFavorite(user.id, jwt);
            console.log('resFavorite: ', resFavorite);
            if (resFavorite.status) {
                setFavorites(resFavorite.favorites);
            }
        }
    }, [user, jwt]);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleSerch = () => {
        if (!search) {
            setLocations(locationRef.current);
            return;
        }
        const newLocations = locations.filter((location) =>
            location.name.toLowerCase().includes(search.toLowerCase())
        );
        setLocations(newLocations);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSerch();
        }
    };

    return (
        <WebLayout>
            <div className="flex text-sm items-center justify-between mb-5">
                <div className="flex flex-1 items-center">
                    <div className="w-5 h-5 bg-t-primary rounded-full flex items-center justify-center text-white mr-2">
                        1
                    </div>
                    <div>Bạn chọn</div>
                    <div className="h-[1px] bg-[#ccc] w-full flex-1 mx-2"></div>
                </div>
                <div className="flex flex-1 items-center">
                    <div className="w-5 h-5 bg-t-primary rounded-full flex items-center justify-center text-white mr-2">
                        2
                    </div>
                    <div>Chi tiết về bạn</div>
                    <div className="h-[1px] bg-[#ccc] w-full flex-1 mx-2"></div>
                </div>
                <div className="flex items-center">
                    <div className="w-5 h-5 bg-t-primary rounded-full flex items-center justify-center text-white mr-2">
                        3
                    </div>
                    <div>Bước cuối cùng</div>
                </div>
            </div>
            <Row gutter={24}>
                <Col span={6}>
                    <div className="border border-[#ccc] p-4 mb-4">
                        <p className="font-bold mb-2">Chi tiết đặt phòng của bạn</p>
                        <Row gutter={24} className="mb-4">
                            <Col span={12}>
                                <p>Nhận phòng</p>
                                <p className="font-bold">T2, 1 tháng 5 2023</p>
                                <p>14:00 – 23:00</p>
                            </Col>
                            <Col span={12}>
                                <p>Trả phòng</p>
                                <p className="font-bold">T4, 3 tháng 5 2023</p>
                                <p>00:00 – 12:00</p>
                            </Col>
                        </Row>
                        <div>
                            <p className="font-bold">Tổng thời gian lưu trú:</p>
                            <p>2 đêm</p>
                        </div>
                    </div>
                    <div className="border border-[#ccc] p-4">
                        <p className="font-bold mb-2">Tóm tắt giá</p>
                        <div className="flex justify-between">
                            <div>Giá gốc</div>
                            <div>VND 6.000.000</div>
                        </div>
                        <div className="flex justify-between mb-4">
                            <div className="w-[60%]">
                                Ưu Đãi Mùa Du Lịch
                                <br />
                                <span className="text-xs">
                                    Bạn nhận được giảm giá vì chỗ nghỉ này đang có ưu đãi.
                                </span>
                            </div>
                            <div>- VND 1.890.000</div>
                        </div>
                    </div>
                    <Row className="bg-[#EBF3FF] p-4">
                        <Col span={12} className="text-2xl font-bold">
                            Tổng <br /> cộng
                        </Col>
                        <Col span={12} className="text-end">
                            <p className="line-through text-red">VND 6.000.000</p>
                            <p className="text-red font-bold">Tiết kiệm 42%</p>
                            <p className="text-xl font-bold">VND 3.510.000</p>
                            <p>Đã bao gồm thuế và phí</p>
                        </Col>
                    </Row>
                    <div className="border border-[#ccc] p-4">
                        <p className="font-bold mb-2">Thông tin giá</p>
                        <Row>
                            <Col span={12}>Đặt cọc đề phòng hư hại (Được hoàn trả toàn bộ)</Col>
                            <Col span={12} className="text-end">
                                <p> VND 1.000.000</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={18}>
                    <div className="border border-[#ccc] p-4">
                        <p className="font-bold">AZ five stars Ocean View Apartment </p>
                    </div>
                </Col>
            </Row>
        </WebLayout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let token = req.cookies['bookingJWT'] || '';

    if (token) {
        if (!store.getState().user.id) {
            store.dispatch(SAGA_GET_USER_DATA_ASYNC(token));
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
    }

    return {
        props: {
            jwt: token,
        },
    };
});
