import WebLayout from '@/components/Layout/WebLayout';
import { Card, Col, Row, Typography } from "antd";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { withIronSession } from 'next-iron-session';


export default function Account() {
    const router = useRouter();
    return (
        <WebLayout>
            <div className="my-12">
                <Typography.Title level={2}><span className="text-bold">Cài đặt tài khoản</span></Typography.Title>
                <Typography.Text>Quản lý trải nghiệm Booking.com của bạn</Typography.Text>
                <Row gutter={12} className="my-4">
                    <Col span={12}>
                        <Card title={<span className='text-lg text-bold'>Thông tin cá nhân</span>} className='w-full cursor-pointer' onClick={() => router.push('/account/personal')}>
                        <Link href="" className="">
                            <Typography className='hover:text-action'>Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng ra sao.</Typography>
                            <Typography className="underline text-action">Quản lý thông tin cá nhân.</Typography>
                        </Link>
                    </Card>
                    </Col>
                    <Col span={12}>
                    <Card title={<span className='text-lg text-bold'>Các tùy chọn</span>} className='w-full'>
                        <Link href="" className="">
                            <Typography className='hover:text-action'>Thay đổi ngôn ngữ, tiền tệ và các yêu cầu hỗ trợ khuyết tật.</Typography>
                            <Typography className="underline text-action">Quản lý tùy chọn.</Typography>
                        </Link>
                    </Card>
                    </Col>
                </Row>
                
            </div>
        </WebLayout>
    )
}

export const getServerSideProps = withIronSession(
    async function getServerSideProps({ req, res }) {
        const user = req.session.get('user');
        console.log('>>>server: user: ', user);
        // if ((user && user.id) || (userCookie && userCookie.id)) {
        //     res.setHeader('location', '/account');
        //     res.statusCode = 302;
        //     res.end();
        //     return { props: { user } };
        // }
        return { props: { } };
    }, {
    password: process.env.SESSION_PASSWORD,
    cookieName: process.env.SESSION_COOKIE_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false,
    },
});