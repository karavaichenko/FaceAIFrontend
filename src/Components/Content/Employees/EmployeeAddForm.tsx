import { useEffect, useState, type SetStateAction } from 'react'
import s from './Employees.module.css'
import { Alert, Button, Checkbox, Form, Input, Upload, type GetProp } from 'antd'
import { useAppDispatch } from '../../../Store/hooks'
import { useSelector } from 'react-redux'
import { selectEmployeesState } from '../../../Store/selectors'
import { postEmployeeThunk, setResultCode } from '../../../Store/employeesReducer'
import Menu from '../Menu/Menu'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd/es/upload'

type PropsType = {
    setMode: React.Dispatch<SetStateAction<boolean>>
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const EmployeeAddForm = (props: PropsType) => {

    const dispatch = useAppDispatch()
    const state = useSelector(selectEmployeesState)

    const [warning, setWarning] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [file, setFile] = useState<File | null>(null);

    let warningElem
    useEffect(() => {
        if (state.resultCode === 5) {
            setWarning("Сотрудник с таким именем уже есть!")
        } else if (state.resultCode === 102) {
            props.setMode(false)
            dispatch(setResultCode(-1))
        } else if (state.resultCode === 1) {
            setWarning("Что-то пошло не так!")
        }
    }, [state.resultCode])

    if (warning) {
        warningElem = <Alert className={s.fit_warning} type="error" message={warning} />
    }
    const onFinish = (e: FieldType) => {
        if (!file) {
            setWarning("Добавьте фото сотрудника!")
            return;
        }
        const formData = new FormData();
        formData.append('photo', file);
        dispatch(postEmployeeThunk(e.name, e.info, e.isAccess === undefined ? true : e.isAccess, formData))
    }

    const exitBtnOnClick = () => {
        props.setMode(false)
    }


    
    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            setWarning('Можно загружать только изображения!');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            setWarning('Изображение должно быть меньше 5MB!');
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
        setFile(file);
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
        <div>
            <Menu />
            <div className={s.container_add}>
                <div>
                    {warningElem}
                    <div className={s.form_container}>
                        <h2>Добавить сотрудника</h2>
                        <Form
                            className={s.form}
                            size="large"
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

                            <Form.Item<FieldType>
                                className={s.upload_container}
                                rules={[{ required: true, message: 'Загрузите фото' }]}
                            >
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
                                    {/* {uploadButton} */}
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>

                            </Form.Item>

                            <Form.Item<FieldType>
                                name="isAccess"
                                className={s.checkbox_field}
                                valuePropName="checked"
                            >
                                <Checkbox defaultChecked value={true} className={s.checkbox}>Доступ</Checkbox>
                            </Form.Item>


                            <Form.Item<FieldType>
                                className={s.field}
                                name="name"
                                rules={[{ required: true, message: 'Введите ФИО' }]}
                            >
                                <Input className={s.input} placeholder="ФИО" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                className={s.field}
                                name="info"
                            >
                                <Input className={s.input} placeholder="доп. информация" />
                            </Form.Item>

                            <div className={s.btn_container}>
                                <Form.Item className={s.submit}>
                                    <Button onClick={exitBtnOnClick} type="default" size="large">
                                        Назад
                                    </Button>
                                </Form.Item>
                                <Form.Item className={s.submit}>
                                    <Button type="primary" htmlType="submit" size="large">
                                        Добавить
                                    </Button>
                                </Form.Item>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

type FieldType = {
    name: string,
    info: string,
    isAccess: boolean
}

export default EmployeeAddForm