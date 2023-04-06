import Category from '@/components/Category';
import WebLayout from '@/components/Layout/WebLayout';
import { wrapper } from '@/redux/store';
import { Layout, Typography } from 'antd';
import React from 'react';
import { END } from 'redux-saga';
import { SAGA_GET_USER_DATA_ASYNC } from './../redux/actions/user.action';
import City from '@/components/City';
import SearchCategory from '@/components/Category/SearchCategory';
import { authUser } from '@/helpers/auth.helper';

export default function Index() {
    return (
        <React.Fragment>
            <WebLayout>
                <Layout className="bg-white">
                    <div>
                        <div>
                            <p level={3} className="font-bold text-2xl mb-2">
                                Ưu đãi
                            </p>
                            <Typography.Text>
                                Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn
                            </Typography.Text>
                        </div>
                        <div>
                            <p level={3} className="font-bold text-2xl mt-4 mb-2">
                                Khám phá Việt Nam
                            </p>
                            <Typography.Text>
                                Các điểm đến phổ biến này có nhiều điều chờ đón bạn
                            </Typography.Text>
                            <City />
                        </div>
                        <div>
                            <p level={3} className="font-bold text-2xl mt-4 mb-2">
                                Lên kế hoạch dễ dàng và nhanh chóng
                            </p>
                            <Typography.Text>
                                Khám phá các điểm đến hàng đầu theo cách bạn thích ở Việt Nam
                            </Typography.Text>
                            <SearchCategory />
                        </div>
                        <div>
                            <p level={3} className="font-bold text-2xl mt-4 mb-2">
                                Tìm theo loại chỗ nghỉ
                            </p>
                            <Typography.Text>
                                Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn
                            </Typography.Text>
                            <Category />
                        </div>
                    </div>
                </Layout>
            </WebLayout>
        </React.Fragment>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let jwt = req.cookies['bookingJWT'] || '';

    if (jwt) {
        if (!store.getState().user.id) {
            store.dispatch(SAGA_GET_USER_DATA_ASYNC(jwt));
            store.dispatch(END);
            await store.sagaTask.toPromise();
            authUser(req, res, jwt);
        }
    }
    return {
        props: {
            jwt,
        },
    };
});
