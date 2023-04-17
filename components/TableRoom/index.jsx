import { formattedPrice } from "@/helpers/price.helper";
import { Button, Space, Table, Tag } from 'antd';

function TableRoom({ rooms }) {
    const columns = [
        {
            title: 'Loại chỗ ở',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Chi tiết',
            dataIndex: 'bedDetail',
            key: 'bedDetail',
        },
        {
            title: 'Giá',
            key: 'newPrice',
            dataIndex: 'newPrice',
            render: (_, { newPrice }) => (
                <Tag color={'red'} >
                    {formattedPrice(newPrice)}
                </Tag>
            ),
        },

        {
            title: 'Các lựa chọn',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button>Đặt ngay</Button>
                </Space>
            ),
        },
    ];

    return <>
        <Table columns={columns} dataSource={rooms} />
    </>
}

export default TableRoom;