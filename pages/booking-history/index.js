import WebLayout from '@/components/Layout/WebLayout';
import Star from '@/components/Star';
import { LocalStorage } from '@/constants/storage.const';
import { diffDay, formatDateVN } from '@/helpers/date.helper';
import { diffPrice, formattedPrice, savePercent } from '@/helpers/price.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import bookingApi from '@/services/booking';
import locationApi from '@/services/location';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Select, Tag, notification } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
const moment = require('moment');
require('moment/locale/vi');

export default function BookingHistory({ jwt }) {
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
    }, []);

    const fetchData = useCallback(async () => {
        setFetching(true);
        const local = JSON.parse(localStorage.getItem(LocalStorage.checkout)) || {}
        if (local.locationId) {
            setLocal(local);
            const res = await locationApi.getOne(local.locationId);
            if (res.status) {
                setLocation(res.location);
                if (res.location.rooms && res.location.rooms.length > 0) {
                    const room = res.location.rooms.filter(room => room.id === local.roomId);
                    if (room && room.length > 0) {
                        setRoom(room[0]);
                    }
                }
            }
        } else {
            setLocation({})
        }
        setFetching(false);
    }, [user, jwt]);

    const handleChange = (value) => {
        setPaymentMethod(value);
    };

    const handleCheckBox = (e) => {
        setPaymentStatus(e.target.checked)
    }

    const handleBooking = async () => {
        setLoading(true);
        try {
            if (local && local.locationId) {
                const data = {
                    paymentMethod,
                    paymentStatus,
                    ...info,
                    price: local.price.newPrice,
                    locationId: local.locationId,
                    checkInDate: local.checkInOutDate[0],
                    checkOutDate: local.checkInOutDate[1],
                }
                console.log('data: ', data);
                const res = await bookingApi.booking(data, jwt);
                notification.open({
                    message: 'Đặt phòng thành công',
                    description: 'Bạn đã đặt phòng thành công!',
                    placement: 'topRight',
                    type: 'success',
                });
                setTimeout(() => {
                    router.push('/booking-history')
                }, 1500);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }


    return (
        <WebLayout>
           Booking History
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
