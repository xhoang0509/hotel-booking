import { Card, Col, Row, Typography } from "antd";
import Dollor from "../Icon/Dollor";
import Heart from "../Icon/Heart";
import CartIcon from "../Icon/Cart";
import Profile from "../Icon/Profile";

export default function Summary() {
    const { Title, Paragraph } = Typography;

    const count = [
        {
            today: "Today’s Sales",
            title: "$53,000",
            persent: "+30%",
            icon: <Dollor />,
            bnb: "bnb2",
        },
        {
            today: "Today’s Users",
            title: "3,200",
            persent: "+20%",
            icon: <Profile />,
            bnb: "bnb2",
        },
        {
            today: "New Clients",
            title: "+1,200",
            persent: "-20%",
            icon: <Heart />,
            bnb: "redtext",
        },
        {
            today: "New Orders",
            title: "$13,200",
            persent: "10%",
            icon: <CartIcon />,
            bnb: "bnb2",
        },
    ];
    return (
        <Row className="rowgap-vbox" gutter={[24, 0]}>
            {count.map((c, index) => (
                <Col
                    key={index}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                    className="mb-24"
                >
                    <Card bordered={false} className="criclebox ">
                        <div className="number">
                            <Row align="middle" gutter={[24, 0]}>
                                <Col xs={18}>
                                    <span>{c.today}</span>
                                    <Title level={3}>
                                        {c.title} <small className={c.bnb}>{c.persent}</small>
                                    </Title>
                                </Col>
                                <Col xs={6}>
                                    <div className="icon-box flex items-center justify-center">{c.icon}</div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}