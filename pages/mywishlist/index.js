import WebLayout from '@/components/Layout/WebLayout';
import LocationCard from '@/components/LocationCard';
import { authUser } from '@/helpers/auth.helper';
import { SAGA_GET_USER_DATA_ASYNC } from '@/redux/actions/user.action';
import { wrapper } from '@/redux/store';
import userApi from '@/services/user';
import { HeartOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { serialize } from 'cookie';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

export default function MyWishList({ jwt }) {
    const user = useSelector((state) => state.user);
    const [fetching, setFetching] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const fetchData = useCallback(async () => {
        setFetching(true);
        try {
            const res = await userApi.getFavorite(user.id, jwt);
            if (res.status) {
                setFavorites(res.favorites);
            }
        } catch (e) {
            console.log(e);
        }
        setFetching(false);
    }, [jwt, user]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WebLayout>
            {fetching && <div>Fetching...</div>}
            {!fetching && (
                <div>
                    <p className="font-bold text-2xl mb-2">Cho chuyến đi sắp tới của tôi</p>
                    <div>
                        <div className="text-sm flex items-center">
                            <HeartOutlined />
                            <span className="ml-2">Đã lưu {favorites.length} chỗ nghỉ</span>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex flex-wrap gap-[10px]">
                        {favorites.map((favorite, index) => {
                            return <LocationCard key={index} location={favorite.location} />;
                        })}
                    </div>
                </div>
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
                    destination: '/account/login',
                    permanent: false,
                },
            };
        }
    } else {
        return {
            redirect: {
                destination: '/account/login',
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
