import { Avatar } from "antd";

export default function AvatarUser() {
    return (
        <div className="border-2 rounded-full border-[#FEBB02]">
            <Avatar src={'https://joesch.moe/api/v1/random?key=1'} className="w-10 h-10"/>
        </div>
    )
}