import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useRouter } from 'next/router';

export default function BackPage({ href }) {
    const router = useRouter();
    return (
        <Typography.Text
            className="flex items-center cursor-pointer hover:text-btn-primary"
            onClick={() => router.push(href)}
        >
            <ArrowLeftOutlined />
            &nbsp; Quay Lại
        </Typography.Text>
    );
}
