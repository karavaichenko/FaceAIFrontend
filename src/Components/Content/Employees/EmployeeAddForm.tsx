import { useEffect, useState, type SetStateAction } from 'react'
import s from './Employees.module.css'
import { Alert, Button, Checkbox, Form, Input } from 'antd'
import { useAppDispatch } from '../../../Store/hooks'
import { useSelector } from 'react-redux'
import { selectEmployeesState } from '../../../Store/selectors'
import { postEmployeeThunk, setResultCode } from '../../../Store/employeesReducer'
import Menu from '../Menu/Menu'
import EmployeePhotoUpload from './EmployeePhotoUpload'

type PropsType = {
    setMode: React.Dispatch<SetStateAction<boolean>>
}


const EmployeeAddForm = (props: PropsType) => {

    const dispatch = useAppDispatch()
    const state = useSelector(selectEmployeesState)

    const [warning, setWarning] = useState("");
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
                                
                                <EmployeePhotoUpload setFile={setFile} setWarning={setWarning}/>

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