import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { noAvatarImage } from '@/constants/images.const';

export default function AvatarUser(url) {
    return (
        <div className="border-2 rounded-full border-[#FEBB02]">
            <Avatar
                src={`${url.url ? url.url : noAvatarImage}`}
                className="w-10 h-10"
                icon={<UserOutlined />}
            />
        </div>
    );
}
