import Gallery from '@/components/Gallery';
import WebLayout from '@/components/Layout/WebLayout';
import NotFoundLocation from '@/components/Location/NotFoundLocation';
import ModalSelectBookingDate from '@/components/Modal/ModalSelectBookingDate';
import TableRoom from '@/components/TableRoom';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import locationApi from '@/services/location';
import userApi from '@/services/user';
import { HeartOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Breadcrumb, DatePicker, Divider, Input, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

const { RangePicker } = DatePicker;
export default function Hotel({ jwt }) {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [loadingBooking, setLoadingBooking] = useState(false);
    const [location, setLocation] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            console.log('id: ', id);
            const res = await locationApi.getOne(id);
            if (res.status) {
                setLocation(res.location);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAddFavorite = useCallback(async () => {
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
    }, [jwt, id, user]);

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
                    {
                        title: <Link href="#">Chi tiết địa điểm</Link>,
                    },
                ]}
                className="mb-4"
            />
            {loading && <div>loading...</div>}
            {!loading && !location && <NotFoundLocation />}
            {!loading && location && (
                <>
                    <div className="flex mb-6">
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
                                <div className="w-full bg-sub-primary text-white rounded-none border-none text-center py-3 cursor-pointer hover:bg-primary">
                                    Tìm
                                </div>
                            </div>
                        </div>
                        <div className="w-[75%]">
                            <div className="text-lg font-bold">{location.name}</div>
                            <p className="text-sm">
                                {location.address} – Vị trí xuất sắc - hiển thị bản đồ
                            </p>
                            <Gallery images={location.images} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-[75%]">
                            <div className="text-sm font-normal pr-10">
                                <p>{location.description}</p>
                                <br />
                                <p className="leading-7 text-justify">
                                    Tọa lạc tại tỉnh Quảng Ninh, cách Đảo Quan Lạn 2,1 km, Song Châu
                                    Villa Quan Lạn cung cấp chỗ nghỉ với nhà hàng, chỗ đỗ xe riêng
                                    miễn phí, khu vườn và sân hiên. Chỗ nghỉ này nằm trong bán kính
                                    khoảng 22 km từ Đảo Ba Mùn, 30 km từ Đảo Cô Tô và 9 km từ Bãi
                                    biển Minh Châu. Nơi đây cung cấp dịch vụ lễ tân 24 giờ và dịch
                                    vụ phòng cho khách. Mỗi phòng nghỉ tại Song Châu Villa Quan Lạn
                                    đều có sân trong nhìn ra khu vườn, máy điều hòa và TV màn hình
                                    phẳng. Chỗ nghỉ phục vụ bữa sáng kiểu lục địa hoặc bữa sáng à la
                                    carte. Song Châu Villa Quan Lạn nằm cách Bãi Dài 26 km. Sân bay
                                    gần nhất là sân bay quốc tế Cát Bi, cách khách sạn 80 km. Các
                                    cặp đôi đặc biệt thích địa điểm này — họ cho điểm 9,8 cho kỳ
                                    nghỉ dành cho 2 người.
                                </p>
                            </div>
                        </div>
                        <div className="w-[20%] bg-[#E4F4FF] p-4 text-sm">
                            <p className="font-bold mb-4">Điểm nổi bật của chỗ nghỉ</p>
                            <p className="font-bold mb-4">Hoàn hảo cho kỳ nghỉ 1 đêm!</p>
                            <div className="text-xs flex my-4">
                                <div className="mx-4">
                                    <LocationOnIcon />
                                </div>
                                <div>
                                    Địa điểm hàng đầu: Được khách gần đây đánh giá cao (9,9 điểm)
                                </div>
                            </div>
                            <p className="font-bold mb-4">Thông tin về bữa sáng</p>
                            <p className="">Kiểu Á</p>
                            <div
                                className="font-bold mt-4 w-full bg-sub-primary text-white rounded-none border-none text-center py-2 cursor-pointer hover:bg-primary"
                                onClick={showModal}
                            >
                                Đặt ngay
                            </div>
                            <div
                                className="font-bold mt-4 w-full text-primary rounded-none text-center py-2 cursor-pointer flex items-center justify-center border-2"
                                onClick={handleAddFavorite}
                            >
                                <HeartOutlined className="mr-2" />
                                Lưu chỗ nghỉ
                            </div>
                            <div className="text-center mt-2 text-xs">Đã lưu vào 19 danh sách</div>
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <p className="font-bold text-xl mb-2">Phòng trống</p>
                        <div className='text-[#D12C18] text-sm mb-2'>
                            <InfoCircleOutlined className='mr-2' />
                            <span>Chọn ngày để xem phòng trống và giá tại chỗ nghỉ này</span>
                        </div>
                        <div className='bg-[#4C76B2] text-white text-sm p-2 mb-2'>Loại chỗ nghỉ</div>
                        <TableRoom rooms={location.rooms}/>
                    </div>
                    <Divider />
                    <div>
                        <p className="font-bold text-xl">Đánh giá của khách hàng</p>
                    </div>
                    <ModalSelectBookingDate
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        loadingBooking={loadingBooking}
                    />
                </>
            )}
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
