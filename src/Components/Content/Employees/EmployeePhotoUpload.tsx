import { Upload, type GetProp, type UploadProps } from "antd";
import s from "./Employees.module.css"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, type SetStateAction } from "react";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type PropsType = {
    setWarning: React.Dispatch<SetStateAction<string>>,
    setFile: React.Dispatch<SetStateAction<File | null>>,
}

const EmployeePhotoUpload = (props: PropsType) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };
    
        const beforeUpload = (file: File) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                props.setWarning('Можно загружать только изображения!');
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                props.setWarning('Изображение должно быть меньше 5MB!');
            }
            return isImage && isLt5M;
        };
    
        const handleChange: UploadProps['onChange'] = (info) => {
            if (info.file.status === 'uploading') {
            setLoading(true);
            return;
            }
            if (info.file.status === 'done') {
            const file = info.file.originFileObj as File;
            props.setFile(file);
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
            }
        };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    return (
        <Upload
            name="photo"
            listType="picture-card"
            className={s.photo_upload}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={({ onSuccess }) => {
                setTimeout(() => {
                onSuccess?.("ok");
                }, 0);
            }}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    )
}

export default EmployeePhotoUpload