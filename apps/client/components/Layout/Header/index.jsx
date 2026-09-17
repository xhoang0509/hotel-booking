import AvatarUser from '@/components/AvatarUser';
import { HeartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'antd';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { removeUser } from '@/redux/reducers/user.reducer';

import thumnailImg from '@/public/images/banner.jpg';
export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state) => state.user);

    const handleLogout = useCallback(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(removeUser());
        router.push('/account/login');
    }, [router, dispatch]);

    const items = [
        {
            key: '1',
            label: <Link href="/account">Quản lý tài khoản</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: <Link href="/mywishlist">Đã lưu</Link>,
            icon: <HeartOutlined />,
        },
        {
            key: '3',
            label: <span onClick={handleLogout}>Đăng xuất</span>,
            icon: <LogoutOutlined />,
        },
    ];
    return (
        <React.Fragment>
            <div className="bg-primary text-[#fff] flex flex-col justify-center items-center">
                <nav className="xl:w-3/5 md:w-full flex justify-between p-3">
                    <div className="flex items-center">
                        <span className="text-xl font-bold cursor-pointer">
                            <Link href="/">Datphong.com</Link>
                        </span>
                    </div>
                    <div className="text-bold flex">
                        <span className="px-3 py-2">VND</span>
                        <span className="px-3 py-2">
                            <FontAwesomeIcon
                                icon={faCircleQuestion}
                                className="text-base w-5 inline-block"
                            />
                        </span>
                        <span className="px-3 py-2">
                            <a>Đăng ký chỗ nghỉ Quý vị</a>
                        </span>
                        {user && !user.id && (
                            <React.Fragment>
                                <button className="px-3 py-2">
                                    <span className="bg-white text-primary p-2 rounded-sm font-bold">
                                        <Link href="/account/register">Đăng ký</Link>
                                    </span>
                                </button>
                                <button className="px-3 py-2">
                                    <span className="bg-white text-primary p-2 rounded-sm font-bold">
                                        <Link href="/account/login">Đăng nhập</Link>
                                    </span>
                                </button>
                            </React.Fragment>
                        )}
                        {user && user.id && (
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <div className="flex items-center cursor-pointer">
                                    <AvatarUser url={user.images} />
                                    <div className="ml-2">
                                        <span className="text-white block">{`${user.firstName} ${user.lastName}`}</span>
                                        <span className="text-xs text-[#FEBB02]">Genius Cấp 1</span>
                                    </div>
                                </div>
                            </Dropdown>
                        )}
                    </div>
                </nav>
            </div>
            {router.pathname === '/' && (
                <div className="flex justify-center bg-black banner">
                    <img className="xl:w-4/5 md:w-full" src={thumnailImg.src} alt="" />
                    <div className="xl:w-4/5 md:w-full banner-overlay"></div>
                    <div className="absolute top-[20%] left-[20%]">
                        <div className="text-white">
                            <p className="font-bold text-5xl mb-5">Vi vu theo cách của bạn</p>
                            <p className="text-2xl mb-5">
                                Tiết kiệm ít nhất 15% cho lưu trú toàn cầu, từ nghỉ <br /> dưỡng đến
                                phiêu lưu hoang dã
                            </p>
                            <button className="bg-[#0071C2] px-5 py-2 capitalize">
                                Tìm ưu đãi mùa du lịch
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
