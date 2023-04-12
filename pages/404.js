import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const NotFoundPage = () => {
    const router = useRouter();
    const handleRedirect = useCallback(() => {
        router.push('/');
    }, []);

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang này không tồn tại!"
            extra={
                <Button type="primary bg-primary" onClick={handleRedirect}>
                    Trang chủ
                </Button>
            }
        />
    );
};

export default NotFoundPage;
