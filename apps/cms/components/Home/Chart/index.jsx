import { Card, Col, Row } from 'antd';
import EChart from './components/Echart';
import LineChart from './components/LineChart';

function SummaryChart() {
    return (
        <Row gutter={[24, 0]}>
            {/* <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                <Card bordered={false} className="criclebox h-full">
                    <EChart />
                </Card>
            </Col> */}
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
                <Card bordered={false} className="criclebox h-full">
                    <LineChart />
                </Card>
            </Col>
        </Row>
    );
}

export default SummaryChart;
