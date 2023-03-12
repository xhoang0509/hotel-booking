import Header from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { Layout, Typography, Input, Button, Form } from 'antd';
import React from 'react';
import Link from 'next/link';

export default function Index() {
    return (
        <React.Fragment>
            <Layout>
                <div>
                    <h1>Home</h1>
                </div>
            </Layout>
        </React.Fragment>
    );
}
