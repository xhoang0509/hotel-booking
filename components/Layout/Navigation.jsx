import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ContainerOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Layout, Button, Menu } from 'antd';
import Link from 'next/link';
const { Sider } = Layout;
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Navigation() {
    const router = useRouter();
    const items = [
        {
            key: 1,
            label: <Link href="/">Tổng quan</Link>,
            icon: <PieChartOutlined />,
        },
        {
            key: 2,
            label: <Link href="/profile">Thông tin tài khoản</Link>,
            icon: <DesktopOutlined />,
        },
        {
            key: 3,
            label: <span>Quản lý nhân viên</span>,
            icon: <PieChartOutlined />,
            children: [
                {
                    key: 4,
                    label: <Link href="/account">Tất cả nhân viên</Link>,
                    icon: <PieChartOutlined />,
                },
                {
                    key: 5,
                    label: <Link href="/account/add">Thêm nhân viên mới</Link>,
                    icon: <PieChartOutlined />,
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
    );
}
