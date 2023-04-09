import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, theme } from 'antd';
import Link from 'next/link';
import { removeAdmin } from '@/redux/reducers/admin.reducer';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';

export default function HeaderLayout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const admin = useSelector((state) => state.admin);
    const { Header } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleLogout = useCallback(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(removeAdmin());
        router.push('/login');
    }, [router, dispatch]);

    const items = [
        {
            key: '1',
            label: <Link href="/profile">Thông tin tài khoản</Link>,
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: <span onClick={handleLogout}>Đăng xuất</span>,
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        >
            <div className="flex justify-between items-center px-8 h-full">
                <Link className="text-bold text-base" href="/">
                    Home
                </Link>
                <Dropdown
                    menu={{
                        items,
                    }}
                    className="cursor-pointer"
                >
                    <div className="flex justify-between items-center">
                        {admin.image ? <Avatar size={50} src={admin.image} className='mr-4 border-2 rounded-full border-[#FEBB02]' />
                            : <Avatar size="large" icon={<UserOutlined />} className="mr-4 rounded-full" />
                        }
                        <div className="mr-4 font-bold text-base">{`${admin.lastName} ${admin.firstName}`}</div>
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
}
