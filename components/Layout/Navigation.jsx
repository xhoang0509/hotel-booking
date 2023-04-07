import {
    DashboardOutlined,
    DesktopOutlined,
    EnvironmentOutlined,
    UserAddOutlined,
    UserOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
const { Sider } = Layout;

export default function Navigation() {
    const router = useRouter();
    const items = [
        {
            key: 1,
            label: <Link href="/">Tổng quan</Link>,
            icon: <DashboardOutlined />,
        },
        {
            key: 2,
            label: <Link href="/profile">Thông tin tài khoản</Link>,
            icon: <DesktopOutlined />,
        },
        {
            key: 3,
            label: <span>Quản lý nhân viên</span>,
            icon: <UsergroupAddOutlined />,
            children: [
                {
                    key: 4,
                    label: <Link href="/account">Tất cả nhân viên</Link>,
                    icon: <UserOutlined />,
                },
                {
                    key: 5,
                    label: <Link href="/account/add">Thêm nhân viên mới</Link>,
                    icon: <UserAddOutlined />,
                },
            ],
        },
        {
            key: 6,
            label: <span>Quản lý khách hàng</span>,
            icon: <UsergroupAddOutlined />,
            children: [
                {
                    key: 7,
                    label: <Link href="/user">Tất cả khách hàng</Link>,
                    icon: <UserOutlined />,
                },
            ],
        },
        {
            key: 7,
            label: <span>Quản lý địa điểm</span>,
            icon: <EnvironmentOutlined />,
            children: [
                {
                    key: 8,
                    label: <Link href="/category">Thể loại</Link>,
                },
                {
                    key: 9,
                    label: <Link href="/city">Thành phố</Link>,
                },
                 {
                    key: 10,
                    label: <Link href="/location">Địa điểm</Link>,
                },
            ],
        },
    ];

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
                className="flex items-center justify-center text-bold text-white cursor-pointer"
            >
                <Link href="/">DATPHONG.COM</Link>
            </div>
            <Menu className='font-bold' theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
    );
}
