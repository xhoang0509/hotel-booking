/* eslint-disable @next/next/no-img-element */
import { saveUser } from '@/redux/reducers/user.reducer';
import { CameraOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Typography, Upload, notification } from 'antd';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';
import { storage } from './../../firebase/storage';
import userApi from './../../services/user/index';

export default function UploadAvatar({ jwt, dispatch, user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            setLoading(true);
            const res = await userApi.update({ images: imageUrl }, user.id, jwt);
            if (res.status) {
                notification.open({
                    message: 'Cập nhật thông tin khách hàng thành công!',
                    description: '',
                    placement: 'topRight',
                    type: 'success',
                });
                dispatch(saveUser({ images: imageUrl }));
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = useCallback(
        (info) => {
            if (info.file.status === 'uploading') {
                setLoading(true);
                return;
            }
            if (info.file.status === 'done') {
                const imageRef = ref(storage, `images/${info.file.name + v4()}`);
                uploadBytes(imageRef, info.file.originFileObj).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setImageUrl(url);
                        dispatch(saveUser({ images: url }));
                    });
                });
                setLoading(false);
            }
        },
        [dispatch]
    );

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <div onClick={showModal}>
                {user.images ? (
                    <div className="cursor-pointer relative">
                        <img
                            src={user.images}
                            alt="avatar"
                            className="w-[100px] h-[100px] border-2 rounded-full object-cover border-[#FEBB02]"
                        />
                        <CameraOutlined className="absolute inset-x-0 bottom-2 text-white" />
                    </div>
                ) : (
                    <div className="border border-dashed rounded-full w-[100px] h-[100px] flex flex-col items-center justify-center cursor-pointer bg-[#FAFAFA]">
                        <PlusOutlined />
                        <Typography.Text>Upload</Typography.Text>
                    </div>
                )}
            </div>
            <Modal
                open={isModalOpen}
                title="Chọn hình ảnh để tải lên"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button
                        className="bg-primary"
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Lưu
                    </Button>,
                ]}
            >
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action=""
                    accept="image/*"
                    onChange={handleChange}
                >
                    {user.images ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <div className="cursor-pointer relative">
                            <img
                                src={user.images}
                                alt="avatar"
                                className="w-[100px] h-[100px] border-2 rounded-full object-cover border-[#FEBB02]"
                            />
                            <CameraOutlined className="absolute inset-x-0 bottom-2 text-white" />
                        </div>
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </Modal>
        </>
    );
}
