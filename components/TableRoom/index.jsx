import { formattedPrice } from '@/helpers/price.helper';
import { Button, Space, Table, Tag } from 'antd';

function TableRoom({ rooms, onBooking, setPrice, setRoomId }) {
    const handleBookingClick = (record) => {
        setPrice({
            oldPrice: record.oldPrice,
            newPrice: record.newPrice,
        });
        setRoomId(record.id);
        onBooking();
    };
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
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_, { images }) => {
                return images.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image}
                            className={`p-2 cursor-pointer max-w-[300px] h-auto`}
                        />
                    );
                });
            },
        },
        {
            title: 'Giá',
            key: 'newPrice',
            dataIndex: 'newPrice',
            render: (_, { newPrice }) => <Tag color={'red'}>{formattedPrice(newPrice)}</Tag>,
        },

        {
            title: 'Các lựa chọn',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle" onClick={() => handleBookingClick(record)}>
                        <Button>Đặt ngay</Button>
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={rooms} />
        </>
    );
}

export default TableRoom;
