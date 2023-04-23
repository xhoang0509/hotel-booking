import WebLayout from '@/components/Layout/WebLayout';
import Location from '@/components/Location';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import locationApi from '@/services/location';
import userApi from '@/services/user';
import { SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, DatePicker, Input, Row, Select } from 'antd';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

export default function Search({ jwt }) {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [search, setSearch] = useState('');
    const locationRef = useRef([]);
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Breadcrumb
                items={[
                    {
                        title: <Link href="/">Trang chủ</Link>,
                    },
                    {
                        title: <Link href="/search">Tìm kiếm</Link>,
                    },
                ]}
                className="mb-4"
            />
            <Row className="w-full">
                <Col className="w-[20%]">
                    <div className="bg-[#FEBB02]  mr-4 p-4">
                        <div className="font-bold mb-2 text-lg">Tìm</div>
                        <div className="mb-4">
                            <p className="text-xs">Tên chỗ nghỉ / địa điểm đến</p>
                            <Input
                                className="rounded-none"
                                prefix={<SearchOutlined />}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-xs">Ngày nhận phòng</p>
                            <DatePicker className="w-full rounded-none" />
                        </div>
                        <div className="mb-4">
                            <p className="text-xs">Ngày trả phòng</p>
                            <DatePicker className="w-full rounded-none" />
                        </div>
                        <div
                            className="w-full bg-sub-primary text-white rounded-none border-none text-center py-3 cursor-pointer hover:bg-primary"
                            onClick={handleSerch}
                        >
                            Tìm
                        </div>
                    </div>
                </Col>
                <Col className="w-[74%]">
                    <div className="font-bold text-lg mb-4">
                        Hà Nội: tìm thấy {locations.length} chỗ nghỉ
                    </div>
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
                    {!loading &&
                        locations.map((location) => {
                            return (
                                <Location
                                    key={location.id}
                                    location={location}
                                    jwt={jwt}
                                    favorites={favorites}
                                />
                            );
                        })}

                    {!loading && locations.length === 0 && (
                        <div>Không tìm thấy chỗ nghỉ phù hợp</div>
                    )}
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
