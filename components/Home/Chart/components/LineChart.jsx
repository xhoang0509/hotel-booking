import { MinusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import lineChart from '../configs/lineChart';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function LineChart() {
    const { Title, Paragraph } = Typography;

    return (
        <>
            <div className="linechart">
                <div>
                    <Title level={5}>Biểu đồ doanh thu</Title>
                </div>
                <div className="sales">
                    <ul>
                        <li>{<MinusOutlined />} Lượt truy cập</li>
                        <li>{<MinusOutlined />} Doanh thu</li>
                    </ul>
                </div>
            </div>

            <ReactApexChart
                className="full-width"
                options={lineChart.options}
                series={lineChart.series}
                type="area"
                height={350}
                width={'100%'}
            />
        </>
    );
}

export default LineChart;
