import { PlusOutlined } from '@ant-design/icons';
import LayoutApp from '@/components/Layout';
import React, { useCallback, useEffect, useState } from 'react';
import { wrapper } from '@/redux/store';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { END } from 'redux-saga';
import { Typography, Space, Table, Tag, Button, Skeleton, Modal, notification } from 'antd';
import { useRouter } from 'next/router';
import adminApi from '@/services/admin';
import { getGender } from '@/constants/gender.const';
import { getDateDetail } from '@/constants/date.const';
import Link from 'next/link';
import { getStatusLabel } from '@/constants/adminStatus.const';
import { authAdmin } from '@/helper/auth.helper';
import writeLog from '@/logger';

export default function Account({ jwt }) {
    const router = useRouter();
    const [fetching, setFetching] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminId, setAdminId] = useState('');

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link href={`/account/${record.id}`} className="font-bold">
                    {`${record.lastName} ${record.firstName}`}
                </Link>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text) => <span>{getDateDetail(text)}</span>,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => <span>{getGender(text)}</span>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'rule.name',
            key: 'rule',
            render: (text, record) => {
                const color = record.rule.id === 1 ? '#f50' : '#87d068';
                return <Tag color={color}>{record.rule.name}</Tag>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                const color = record.status === 'active' ? 'red' : 'gray';
                return <Tag color={color}>{getStatusLabel(record.status)}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record.id)}>Chỉnh sửa</Button>
                    {record.status === 'active' && (
                        <Button
                            danger
                            className="bg-transparent"
                            onClick={() => handleDisableClick(record.id)}
                        >
                            Vô hiệu hóa
                        </Button>
                    )}
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
            const res = await adminApi.getAll(jwt);
            if (res.status) {
                setAdmins(res.admins);
            }
        } catch (error) {
            console.log(error);
        }
        setFetching(false);
    }, [jwt]);

    const handleEditClick = useCallback(
        (id) => {
            router.push(`/account/${id}`);
        },
        [router]
    );

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
                    <Typography.Title level={4}>Tất cả nhân viên</Typography.Title>
                    <Button
                        icon={<PlusOutlined />}
                        className="flex items-center text-white mb-4 bg-btn-primary"
                        onClick={() => router.push('/account/add')}
                    >
                        Thêm nhân viên mới
                    </Button>
                    <Table columns={columns} dataSource={admins} />
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
