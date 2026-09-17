import LayoutApp from '@/components/Layout';
import { authAdmin } from '@/helper/auth.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import adminApi from '@/services/admin';
import roomApi from '@/services/room';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Skeleton, Space, Table, Tag, Typography, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { END } from 'redux-saga';

import { formattedPrice } from '@/helper/price.helper';
import noImage from '@/public/images/no-image.png';
export default function Room({ jwt }) {
    const router = useRouter();
    const [fetching, setFetching] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminId, setAdminId] = useState('');

    const columns = [
        {
            title: 'Tên phòng',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link href={`/room/${record.id}`} className="font-bold">
                    {`${record.name}`}
                </Link>
            ),
        },
        {
            title: 'Số gường',
            dataIndex: 'bed',
            key: 'bed',
        },
        {
            title: 'Hỉnh ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => {
                if (record.images && record.images.length > 0) {
                    return (
                        <Image
                            src={record.images[0]}
                            alt="image"
                            className="w-[200px] h-auto"
                            width={'200'}
                            height={'300'}
                        />
                    );
                } else {
                    <img src={noImage} className="max-w-[200px]" />;
                }
            },
        },
        {
            title: 'Giá phòng',
            dataIndex: 'newPrice',
            key: 'newPrice',
            render: (_, record) => {
                return <Tag color="green">{formattedPrice(_)}</Tag>;
            },
        },
        {
            title: 'Địa điểm',
            dataIndex: 'city',
            key: 'city',
            render: (_, record) => {
                return <Link href={`/location/${record.location.id}`}>{record.location.name}</Link>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record.id)}>Chỉnh sửa</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = useCallback(async () => {
        setFetching(true);
        try {
            const res = await roomApi.getAll(jwt);
            if (res.status) {
                setRooms(res.rooms);
            }
        } catch (error) {
            console.log(error);
        }
        setFetching(false);
    }, [jwt]);

    const handleEditClick = useCallback(
        (id) => {
            router.push(`/room/${id}`);
        },
        [router]
    );

    const handleOk = useCallback(async () => {
        try {
            const res = await adminApi.update({ status: 'inactive' }, adminId, jwt);
            if (res.status) {
                notification.open({
                    message: 'Vô hiệu hóa thành công',
                    placement: 'topRight',
                    type: 'success',
                });
                setTimeout(() => {
                    router.reload();
                }, 2000);
            }
        } catch (e) {
            console.log(e);
        }
        setIsModalOpen(false);
    }, [router, adminId, jwt]);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <LayoutApp>
            {fetching && <Skeleton />}
            {!fetching && (
                <>
                    <Typography.Title level={4}>Tất cả phòng</Typography.Title>
                    <Button
                        icon={<PlusOutlined />}
                        className="flex items-center text-white mb-4 bg-btn-primary"
                        onClick={() => router.push('/room/add')}
                    >
                        Thêm phòng mới
                    </Button>
                    <Table columns={columns} dataSource={rooms} />
                    <Modal
                        title="Vô hiệu hóa"
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Hủy
                            </Button>,
                            <Button key="submit" danger onClick={handleOk}>
                                Chắc chắn
                            </Button>,
                        ]}
                    >
                        <p>Bạn có chắc chắn muốn vô hiệu hóa nhân viên này không?</p>
                    </Modal>
                </>
            )}
        </LayoutApp>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let token = req.cookies['adminJWT'] || '';

    if (token) {
        const status = await authAdmin(token);
        if (status) {
            if (!store.getState().admin.id) {
                store.dispatch(SAGA_GET_ADMIN_DATA_ASYNC(token));
                store.dispatch(END);
                await store.sagaTask.toPromise();
            }
        } else {
            res.setHeader(
                'Set-Cookie',
                'adminJWT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
            );
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }
    } else {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {
            jwt: token,
        },
    };
});
