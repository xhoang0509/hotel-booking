import AvatarUser from '@/components/AvatarUser';
import { HeartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'antd';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
    const dispath = useDispatch();
    const user = useSelector((state) => state.user);
    const handleLogout = useCallback(async () => {
        console.log('handle logout');
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        router.push('/');
    }, []);

    const items = [
        {
            key: '1',
            label: <Link href="/account">Quản lý tài khoản</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: 'Đã lưu',
            icon: <HeartOutlined />,
        },
        {
            key: '3',
            label: <span onClick={handleLogout}>Đăng xuất</span>,
            icon: <LogoutOutlined />,
        },
    ];
    return (
        <div className="bg-primary text-[#fff] flex justify-center items-center">
            <nav className="xl:w-3/5 md:w-full flex justify-between p-3">
                <div className="flex items-center">
                    <span className="text-xl text-bold cursor-pointer">
                        <Link href="/">BOOKING.COM</Link>
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
                                <span className="bg-white text-primary p-2 rounded-sm">
                                    <Link href="/account/register">Đăng ký</Link>
                                </span>
                            </button>
                            <button className="px-3 py-2">
                                <span className="bg-white text-primary p-2 rounded-sm">
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
                            <div className="flex items-center">
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
            <nav></nav>
        </div>
    );
}
