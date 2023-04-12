import WebLayout from '@/components/Layout/WebLayout';
import Address from '@/components/Personal/Address';
import Birthday from '@/components/Personal/Birthday';
import Gender from '@/components/Personal/Gender';
import Name from '@/components/Personal/Name';
import Nationality from '@/components/Personal/Nationality';
import Phone from '@/components/Personal/Phone';
import { authUser } from '@/helpers/auth.helper';
import { wrapper } from '@/redux/store';
import {
    BellOutlined,
    CreditCardOutlined,
    LockOutlined,
    SettingOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { Card, Divider, Typography } from 'antd';
import { serialize } from 'cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import UploadAvatar from './../../../components/Personal/UploadAvatar';
import { SAGA_GET_USER_DATA_ASYNC } from './../../../redux/actions/user.action';

const gridStyle = {
    width: '100%',
};

const listNavigation = [
    {
        icon: <UserAddOutlined />,
        title: 'Thông tin cá nhân',
    },

    {
        icon: <SettingOutlined />,
        title: 'Các tùy chọn',
    },
    {
        icon: <LockOutlined />,
        title: 'An toàn và bảo mật',
    },
    {
        icon: <CreditCardOutlined />,
        title: 'Thông tin thanh toán',
    },
    {
        icon: <BellOutlined />,
        title: 'Thông báo email',
    },
];

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function Personal({ token }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <WebLayout>
            <div className="flex">
                <Card className="w-1/4 mr-4">
                    {listNavigation.map((item, index) => {
                        return (
                            <Card.Grid style={gridStyle} key={index} className="cursor-pointer">
                                <span className="text-lg mr-4">{item.icon}</span>
                                <span>{item.title}</span>
                            </Card.Grid>
                        );
                    })}
                </Card>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>
                            <Typography.Text className="text-bold text-4xl">
                                Thông tin cá nhân
                            </Typography.Text>
                            <Typography.Text className="text-base block mt-4">
                                Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử
                                dụng ra sao.
                            </Typography.Text>
                        </div>
                        <div>
                            <UploadAvatar jwt={token} dispatch={dispatch} user={user} />
                        </div>
                    </div>
                    <Divider />
                    <Name
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        jwt={token}
                        user={user}
                        dispatch={dispatch}
                    />
                    <Divider />
                    <Phone
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        jwt={token}
                        user={user}
                        dispatch={dispatch}
                    />
                    <Divider />
                    <Birthday
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        jwt={token}
                        user={user}
                        dispatch={dispatch}
                    />
                    <Divider />
                    <Nationality
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        jwt={token}
                        user={user}
                        dispatch={dispatch}
                    />
                    <Divider />
                    <Gender
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        jwt={token}
                        user={user}
                        dispatch={dispatch}
                    />
                    <Divider />
                    <Address
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        jwt={token}
                        user={user}
                        dispatch={dispatch}
                    />
                </div>
            </div>
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
            token,
        },
    };
});
