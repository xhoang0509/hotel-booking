import WebLayout from '@/components/Layout/WebLayout';
import Star from '@/components/Star';
import { LocalStorage } from '@/constants/storage.const';
import { authUser } from '@/helpers/auth.helper';
import { diffDay, formatDateVN } from '@/helpers/date.helper';
import { generateRandomNumber } from '@/helpers/id.helper';
import { diffPrice, formattedPrice, savePercent } from '@/helpers/price.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import bookingApi from '@/services/booking';
import locationApi from '@/services/location';
import paymentApi from '@/services/payment';
import roomApi from '@/services/room';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Select, Skeleton, Tag, notification } from 'antd';
import { serialize } from 'cookie';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

export default function Checkout({ jwt }) {
    const router = useRouter();
    const user = useSelector((state) => state.user);
    const [info, setInfo] = useState({
        userId: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
    });
    const [local, setLocal] = useState({});
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState({});
    const [room, setRoom] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [paymentStatus, setPaymentStatus] = useState(false);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        setFetching(true);
        const local = JSON.parse(localStorage.getItem(LocalStorage.checkout)) || {};
        if (local.roomId && local.locationId) {
            setLocal(local);
            const [resLocation, resRoom] = await Promise.all([
                locationApi.getOne(local.locationId),
                roomApi.getOne(local.roomId),
            ]);

            if (resLocation.status) {
                setLocation(resLocation.location);
            }
            if (resRoom.status) {
                setRoom(resRoom.room);
            }
        } else {
            setLocation({});
            router.push('/search');
        }
        setFetching(false);
    }, []);

    const handleChange = (value) => {
        setPaymentMethod(value);
    };

    const handleCheckBox = (e) => {
        setPaymentStatus(e.target.checked);
    };

    const handleBooking = async () => {
        setLoading(true);
        try {
            if (local && local.roomId) {
                const bookingId = generateRandomNumber();
                const data = {
                    paymentMethod,
                    paymentStatus,
                    ...info,
                    price: local.price.newPrice,
                    roomId: local.roomId,
                    locationId: local.locationId,
                    checkInDate: local.checkInOutDate[0],
                    checkOutDate: local.checkInOutDate[1],
                    bookingId,
                };
                if (paymentMethod === 'vnpay') {
                    const body = {
                        amount: local.price.newPrice,
                        bankCode: '',
                        orderDescription: bookingId,
                        orderType: 170000,
                        language: 'vn',
                    };
                    const res = await paymentApi.create(body, jwt);
                    if (res.status) {
                        await bookingApi.booking(data, jwt);
                        window.location = res.redirectUrl;
                    }
                } else {
                    const res = await bookingApi.booking(data, jwt);
                    if (res.status) {
                        notification.open({
                            message: 'Đặt phòng thành công',
                            description: 'Bạn đã đặt phòng thành công!',
                            placement: 'topRight',
                            type: 'success',
                        });
                        localStorage.removeItem(LocalStorage.checkout);
                        router.push('/booking-history');
                    } else {
                        notification.open({
                            message: 'Đặt phòng thất bại',
                            description: 'Bạn đã đặt phòng thất bại!',
                            placement: 'topRight',
                            type: 'error',
                        });
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <WebLayout>
            {(fetching || !Object.keys(local).length > 0 || !Object.keys(location).length) && (
                <Skeleton />
            )}
            {!fetching && Object.keys(local).length > 0 && Object.keys(location).length && (
                <>
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
                                        <p className="font-bold">
                                            {formatDateVN(local.checkInOutDate[0])}
                                        </p>
                                        <p>08:00 – 23:00</p>
                                    </Col>
                                    <Col span={12}>
                                        <p>Trả phòng</p>
                                        <p className="font-bold">
                                            {formatDateVN(local.checkInOutDate[1])}
                                        </p>
                                        <p>08:00 – 23:00</p>
                                    </Col>
                                </Row>
                                <div>
                                    <p className="font-bold">Tổng thời gian lưu trú:</p>
                                    <p>
                                        {diffDay(local.checkInOutDate[0], local.checkInOutDate[1])}{' '}
                                        ngày
                                    </p>
                                </div>
                            </div>
                            <div className="border border-[#ccc] p-4">
                                <p className="font-bold mb-2">Tóm tắt giá</p>
                                <div className="flex justify-between">
                                    <div>Giá gốc</div>
                                    <div>VND {formattedPrice(local.price.oldPrice)}</div>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <div className="w-[60%]">
                                        Ưu Đãi Mùa Du Lịch
                                        <br />
                                        <span className="text-xs">
                                            Bạn nhận được giảm giá vì chỗ nghỉ này đang có ưu đãi.
                                        </span>
                                    </div>
                                    <div>
                                        - VND{' '}
                                        {formattedPrice(
                                            diffPrice(local.price.oldPrice, local.price.newPrice)
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Row className="bg-[#EBF3FF] p-4">
                                <Col span={12} className="text-2xl font-bold">
                                    Tổng <br /> cộng
                                </Col>
                                <Col span={12} className="text-end">
                                    <p className="line-through text-red">
                                        VND {formattedPrice(local.price.oldPrice)}
                                    </p>
                                    <p className="text-red font-bold">
                                        Tiết kiệm{' '}
                                        {savePercent(local.price.oldPrice, local.price.newPrice)}%
                                    </p>
                                    <p className="text-xl font-bold">
                                        VND {formattedPrice(local.price.newPrice)}
                                    </p>
                                    <p>Đã bao gồm thuế và phí</p>
                                </Col>
                            </Row>
                            <div className="border border-[#ccc] p-4">
                                <p className="font-bold mb-2">Thông tin giá</p>
                                <Row>
                                    <Col span={12}>
                                        Đặt cọc đề phòng hư hại (Được hoàn trả toàn bộ)
                                    </Col>
                                    <Col span={12} className="text-end">
                                        <p> VND 1.000.000</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={18}>
                            <div className="border border-[#ccc] p-4 mb-4">
                                <div className="flex">
                                    <img
                                        src={location.thumbnail}
                                        className="w-[200px] h-[200px] mr-4"
                                        alt={location.name}
                                    />
                                    <div className="mb-2">
                                        <div>
                                            Căn hộ <Star number={4} />
                                            <span className="bg-[#FEBB02] px-1">
                                                Mới trên Booking.com
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold">{location.name}</p>
                                        <p className="">{location.address}</p>
                                        <div>
                                            {location &&
                                                location.convenients.map((convenient, idx) => {
                                                    return (
                                                        <Tag key={idx} className="m-1">
                                                            {convenient}
                                                        </Tag>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-[#ccc] p-4 mb-4">
                                <div className="text-xl font-bold">Mách nhỏ:</div>
                                <p className="flex items-center">
                                    <CheckCircleOutlined className="mr-2 text-xl text-success" />
                                    <span>Bạn sẽ có nguyên studio cho riêng mình!</span>
                                </p>
                            </div>
                            <div className="border border-[#ccc] p-4 mb-4">
                                <div className="text-xl font-bold mb-4">
                                    Nhập thông tin chi tiết của bạn:
                                </div>
                                <div className="flex bg-[#F2F2F2] p-4 items-center border border-[#ccc] mb-4">
                                    <InfoCircleOutlined className="text-xl mr-2 text-[#323232]" />
                                    <div>
                                        <p className="mb-2">
                                            Gần xong rồi! Chỉ cần điền phần thông tin{' '}
                                            <span className="text-red">*</span> bắt buộc
                                        </p>
                                        <p>
                                            Vui lòng điền thông tin bằng Tiếng Việt hoặc Tiếng Anh
                                        </p>
                                    </div>
                                </div>
                                <Form>
                                    <Row gutter={24}>
                                        <Col span={6}>
                                            Họ
                                            <Form.Item
                                                name={'lastName'}
                                                initialValue={user.lastName}
                                            >
                                                <Input
                                                    value={user.lastName}
                                                    onChange={(e) =>
                                                        setInfo({
                                                            ...info,
                                                            lastName: e.target.value,
                                                        })
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            Tên
                                            <Form.Item
                                                name={'firstName'}
                                                initialValue={user.firstName}
                                            >
                                                <Input
                                                    value={user.firstName}
                                                    onChange={(e) =>
                                                        setInfo({
                                                            ...info,
                                                            firstName: e.target.value,
                                                        })
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={8}>
                                            Email
                                            <Form.Item
                                                name={'email'}
                                                initialValue={user.email}
                                                help={
                                                    'Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này'
                                                }
                                            >
                                                <Input
                                                    value={user.email}
                                                    onChange={(e) =>
                                                        setInfo({ ...info, email: e.target.value })
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <div className="border border-[#ccc] p-4 mb-4">
                                <div className="text-xl font-bold mb-4">Thông tin phòng:</div>
                                <div className="text-base font-bold mb-4">{room.name}</div>
                                <Row gutter={24}>
                                    <Col span={6}>
                                        {room.images.map((image, index) => {
                                            return (
                                                <img
                                                    src={image}
                                                    key={index}
                                                    className="w-[200px] h-[200px] m-2"
                                                    alt="room name"
                                                />
                                            );
                                        })}
                                    </Col>
                                    <Col span={18}>{room.description}</Col>
                                </Row>
                            </div>
                            <div className="border border-[#ccc] p-4 mb-4">
                                <div className="text-xl font-bold mb-4">Xem lại quy tắc chung:</div>
                                <div>Chủ chỗ nghỉ muốn bạn đồng ý với các quy tắc chung này:</div>
                                <div>Không cho phép thú cưng</div>
                                <div>
                                    Khi tiếp tục các bước tiếp theo, bạn đồng ý với các quy tắc
                                    chung này.
                                </div>
                            </div>
                            <div className="border border-[#ccc] p-4 mb-4">
                                <div className="text-xl font-bold mb-4">Thanh toán:</div>
                                <div>
                                    <div className="mb-2">Phương thức thanh toán: </div>
                                    <Select
                                        className="w-[400px]"
                                        defaultValue="cash"
                                        options={[
                                            {
                                                value: 'cash',
                                                label: 'Thanh toán tiền mặt',
                                            },
                                            {
                                                value: 'banking',
                                                label: 'Thanh toán qua ngân hàng',
                                            },
                                            {
                                                value: 'vnpay',
                                                label: 'Thanh toán qua VNPAY',
                                            },
                                        ]}
                                        onChange={handleChange}
                                    />
                                    {paymentMethod === 'banking' && (
                                        <>
                                            <img
                                                src={location.qr_banking}
                                                className="w-[300px] h-[300px] mt-6"
                                                alt={location.name}
                                            />
                                            <Checkbox onChange={handleCheckBox}>
                                                Xác nhận đã thanh toán
                                            </Checkbox>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <Button
                                        size="large"
                                        className="bg-t-primary text-white mt-4"
                                        onClick={handleBooking}
                                        loading={loading}
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </WebLayout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let token = req.cookies['bookingJWT'] || '';

    if (token) {
        const status = await authUser(token);
        if (status) {
            if (!store.getState().user.id) {
                store.dispatch(SAGA_GET_USER_DATA_ASYNC(token));
                store.dispatch(END);
                await store.sagaTask.toPromise();
            }
        } else {
            res.setHeader(
                'Set-Cookie',
                serialize('bookingJWT', '', {
                    httpOnly: true,
                    maxAge: -1,
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                })
            );
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            jwt: token,
        },
    };
});
