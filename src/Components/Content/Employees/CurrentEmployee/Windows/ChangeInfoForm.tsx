import { Alert, Button, Checkbox, Form, Input } from 'antd'
import s from './Windows.module.css'
import { useEffect, useState, type SetStateAction } from 'react'
import { setResultCode, updateEmployeeDataThunk, type EmployeeType } from '../../../../../Store/employeesReducer'
import { useSelector } from 'react-redux'
import { selectEmployeeResultCode } from '../../../../../Store/selectors'
import { useAppDispatch } from '../../../../../Store/hooks'

type PropsType = {
    setChangeInfo: React.Dispatch<SetStateAction<boolean>>,
    employee: EmployeeType | null
}

const ChangeInfoForm = (props: PropsType) => {

    const resultCode = useSelector(selectEmployeeResultCode)
    const [warning, setWarning] = useState("");
    const dispatch = useAppDispatch()

    let warningElem

    if (warning) {
        warningElem = <Alert className={s.fit_warning} type="error" message={warning} />
    }

    useEffect(() => {
        if (resultCode === 102) {
            props.setChangeInfo(false)
            dispatch(setResultCode(-1))
        } else if (resultCode === 5) {
            setWarning("Сотрудник с таким именем уже есть!")
        }
    }, [resultCode])

    const onFinish = (e: FieldType) => {
        const name = e.name ? e.name : props.employee?.name
        const info = e.info ? e.info : props.employee?.info
        const isAccess = e.isAccess ? e.isAccess : props.employee?.isAccess
        if (props.employee?.id && name && info && isAccess !== undefined) {
            dispatch(updateEmployeeDataThunk(props.employee?.id, name, info, isAccess))
        } else {
            props.setChangeInfo(false)
        }
    }

    return (
        <div className={s.container}>
            {warningElem}
            <div className={s.form_container}>
                <div className={s.label}>Изменить сотрудника</div>
                <Form
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
                        name="name"
                    >
                        <Input className={s.input} defaultValue={props.employee?.name} placeholder="ФИО" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="info"
                    >
                        <Input className={s.input} defaultValue={props.employee?.info} placeholder="доп. информация" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="isAccess"
                        valuePropName="checked"
                        className={s.checkbox_container}
                    >
                        {props.employee?.isAccess ? <Checkbox defaultChecked className={s.checkbox}>Доступ</Checkbox> :
                            <Checkbox className={s.checkbox}>Доступ</Checkbox>}
                    </Form.Item>

                    <div className={s.btn_container}>
                        <Form.Item>
                            <Button onClick={() => {props.setChangeInfo(false)}} type="default" size="large">
                                Назад
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">
                                Изменить
                            </Button>
                        </Form.Item>
                    </div>

                </Form>
            </div>
        </div>
    )
}

type FieldType = {
    name: string,
    info: string,
    isAccess: boolean
}

export default ChangeInfoForm