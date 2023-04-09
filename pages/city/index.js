import LayoutApp from '@/components/Layout';
import { authAdmin } from '@/helper/auth.helper';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { wrapper } from '@/redux/store';
import adminApi from '@/services/admin';
import cityApi from '@/services/city';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Skeleton, Space, Table, Typography, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { END } from 'redux-saga';

export default function City({ jwt }) {
    const router = useRouter();
    const [fetching, setFetching] = useState(false);
    const [cities, setCities] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminId, setAdminId] = useState('');

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link href={`/city/${record.id}`} className="font-bold">
                    {`${record.name}`}
                </Link>
            ),
        },
        {
            title: 'Hỉnh ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => <Image src={text} alt="image" className="w-[200px] h-auto" width={'200'} height={'300'} />,
        },
        {
            title: 'Số lượng',
            dataIndex: 'phone',
            key: 'phone',
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
            const res = await cityApi.getAll(jwt);
            if (res.status) {
                setCities(res.cities);
            }
        } catch (error) {
            console.log(error);
        }
        setFetching(false);
    }, [jwt]);

    const handleEditClick = useCallback((id) => {
        router.push(`/city/${id}`);
    }, [router]);

    const showModal = () => {
        setIsModalOpen(true);
    };

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

    const handleDisableClick = useCallback((id) => {
        setAdminId(id);
        showModal();
    }, []);

    return (
        <LayoutApp>
            {fetching && <Skeleton />}
            {!fetching && (
                <>
                    <Typography.Title level={4}>Tất cả thành phố</Typography.Title>
                    <Button
                        icon={<PlusOutlined />}
                        className="flex items-center text-white mb-4 bg-btn-primary"
                        onClick={() => router.push('/city/add')}
                    >
                        Thêm thành phố mới
                    </Button>
                    <Table columns={columns} dataSource={cities} />
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
            res.setHeader('Set-Cookie', 'adminJWT=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;');
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
            jwt:token,
        },
    };
});
