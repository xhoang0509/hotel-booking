import { getRandomColor } from '@/helpers/color.helper';
import { getDayMonthYear } from '@/helpers/date.helper';
import { formattedPrice } from '@/helpers/price.helper';
import { Button, Space, Table, Tag, notification } from 'antd';
import { useSelector } from 'react-redux';

function TableRoom({ rooms, onBooking, setPrice, setRoomId }) {
    const user = useSelector((state) => state.user);

    const handleBookingClick = async (record) => {
        if (user && user.id) {
            setPrice({
                oldPrice: record.oldPrice,
                newPrice: record.newPrice,
            });
            setRoomId(record.id);
            onBooking();
        } else {
            notification.open({
                message: 'Yêu cầu đăng nhập để nhận phòng!',
                description: '',
                placement: 'topRight',
                type: 'error',
            });
        }
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
                            className={`p-2 cursor-pointer max-w-[200px] h-auto`}
                            alt="room image"
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
            title: 'Phòng đã đặt',
            dataIndex: 'description',
            key: 'description',
            render: (_, record) => {
                if (record.userBookings && record.userBookings.length > 0) {
                    const color = getRandomColor();
                    return (
                        <div>
                            {record.userBookings.length > 0 &&
                                record.userBookings.map((booking) => {
                                    return (
                                        <Tag className="mt-2" color={color}>
                                            {getDayMonthYear(booking.checkInDate)}-
                                            {getDayMonthYear(booking.checkOutDate)}
                                        </Tag>
                                    );
                                })}
                        </div>
                    );
                } else {
                    return <Tag>Phòng trống</Tag>;
                }
            },
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
