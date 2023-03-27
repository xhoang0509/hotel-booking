import { PlusOutlined } from '@ant-design/icons';
import LayoutApp from '@/components/Layout';
import React from 'react';
import { wrapper } from '@/redux/store';
import { SAGA_GET_ADMIN_DATA_ASYNC } from '@/redux/actions/admin.action';
import { END } from 'redux-saga';
import { Typography, Space, Table, Tag, Button } from 'antd';
import { data } from './data';
import { useRouter } from 'next/router';

export default function Account() {
    const router = useRouter();
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'rule',
            key: 'rule',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    return (
        <LayoutApp>
            <Typography.Title level={4}>Tất cả nhân viên</Typography.Title>
            <Button
                icon={<PlusOutlined />}
                className="flex items-center text-white mb-2"
                onClick={() => router.push('/account/add')}
            >
                Thêm nhân viên mới
            </Button>
            <Table columns={columns} dataSource={data} />
        </LayoutApp>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let jwt = req.cookies['adminJWT'] || '';

    if (jwt) {
        if (!store.getState().admin.id) {
            store.dispatch(SAGA_GET_ADMIN_DATA_ASYNC(jwt));
            store.dispatch(END);
            await store.sagaTask.toPromise();
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
            jwt,
        },
    };
});
