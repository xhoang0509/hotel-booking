import { Typography, Form, Input } from 'antd';

export default function Footer() {
    return (
        <div className="flex flex-col items-center bg-primary py-12">
            <Typography className="text-white text-xl">Tiết kiệm thời gian và tiền bạc!</Typography>
            <Typography className="text-secondary my-2 mb-4">
                Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn
            </Typography>
            <div>
                <Form name="basic" autoComplete="off" layout="vertical">
                    <Form.Item name="email" className="inline-block mr-2">
                        <Input
                            size="large"
                            placeholder="Your email address"
                            className="rounded-sm py-2 w-60"
                        />
                    </Form.Item>
                    <Form.Item className="inline-block">
                        <button
                            className="text-white text-lg bg-[#0071C2] rounded-sm py-2 px-4"
                            type="submit"
                        >
                            Subcribe
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
