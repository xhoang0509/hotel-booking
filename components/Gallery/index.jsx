import { Modal } from "antd";
import { useCallback, useState } from "react";

function Gallery({ images }) {
    const [selected, setSelected] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleImageClick = useCallback((image) => {
        setIsModalOpen(true);
        setSelected(image);
    }, []);


    return <div className="flex flex-wrap">
        {images.map((image, index) => {
            return <img onClick={() => handleImageClick(image)} key={index} src={image} className={`p-2 cursor-pointer`} />
        })}


        <Modal open={isModalOpen} footer={[]} onCancel={handleCancel} width={1000}>
            <img src={selected} alt="" className="w-full h-auto" />
        </Modal>
    </div>
}

export default Gallery;