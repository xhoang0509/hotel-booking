import { Card, Col, Row, Typography } from 'antd';
import Dollor from '../Icon/Dollor';
import Heart from '../Icon/Heart';
import CartIcon from '../Icon/Cart';
import Profile from '../Icon/Profile';
import { useEffect, useState } from 'react';
import analyticApi from '@/services/analytic';
import { formattedPrice } from '@/helper/price.helper';

export default function Summary({ jwt }) {
    const { Title, Paragraph } = Typography;
    const [loading, setLoading] = useState(false);
    const [analytic, setAnalytic] = useState(null);
    const [datasource, setDatasource] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await analyticApi.getAll(jwt);
            if (res.status) {
                setAnalytic(res.payload);
                setDatasource([
                    {
                        today: 'Doanh thu',
                        title: formattedPrice(res.payload.revenue),
                        persent: '+30%',
                        icon: <Dollor />,
                    },
                    {
                        today: 'Số lượng người dùng',
                        title: res.payload.user,
                        persent: '+20%',
                        icon: <Profile />,
                    },
                    {
                        today: 'Số địa điểm',
                        title: res.payload.location,
                        persent: '-20%',
                        icon: <Heart />,
                    },
                    {
                        today: 'Số lượng phòng',
                        title: res.payload.room,
                        persent: '-20%',
                        icon: <Heart />,
                    },
                    {
                        today: 'Số lượng đã phòng đặt',
                        title: res.payload.booking,
                        persent: '10%',
                        icon: <CartIcon />,
                    },
                ]);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <>
            {loading && <div>Loading...</div>}
            {!loading && datasource && (
                <Row className="rowgap-vbox" gutter={[24, 0]}>
                    {datasource.map((c, index) => (
                        <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                            <Card bordered={false} className="criclebox ">
                                <div className="number">
                                    <Row align="middle" gutter={[24, 0]}>
                                        <Col xs={18}>
                                            <span>{c.today}</span>
                                            <Title level={3}>{c.title}</Title>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="icon-box flex items-center justify-center">
                                                {c.icon}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}
