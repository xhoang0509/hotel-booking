import WebLayout from '@/components/Layout/WebLayout';
import { Layout, Typography } from 'antd';
import React from 'react';

export default function Index() {
    return (
        <React.Fragment>
            <WebLayout>
                <Layout>
                    <div>
                        <div>
                            <Typography.Title level={4} className="font-bold">Ưu đãi</Typography.Title>
                            <Typography.Text>Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn</Typography.Text>
                        </div>
                        <div>
                            <Typography.Title level={4} className="font-bold">Khám phá Việt Nam</Typography.Title>
                            <Typography.Text>Các điểm đến phổ biến này có nhiều điều chờ đón bạn</Typography.Text>
                        </div>
                        <div>
                            <Typography.Title level={4} className="font-bold">Tìm theo loại chỗ nghỉ</Typography.Title>
                            <Typography.Text>Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn</Typography.Text>
                        </div>
                    </div>
                </Layout>
            </WebLayout>
        </React.Fragment>
    );
}
