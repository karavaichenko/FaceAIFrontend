import { useEffect, useState, type SetStateAction } from 'react'
import s from './Users.module.css'
import Menu from '../Menu/Menu'
import { Alert, Button, Checkbox, Form, Input } from 'antd'
import { useAppDispatch } from '../../../Store/hooks'
import { addUserThunk, setResultCode } from '../../../Store/usersReducer'
import { useSelector } from 'react-redux'
import { selectUsersState } from '../../../Store/selectors'

type PropsType = {
    setMode: React.Dispatch<SetStateAction<boolean>>
}

const UserAddForm = (props: PropsType) => {

    const dispatch = useAppDispatch()
    const state = useSelector(selectUsersState)
    const [warning, setWarning] = useState("");
    let warningElem
    useEffect(() => {
        if (state.resultCode === 5) {
            setWarning("Аккаунт с таким логином уже есть!")
        } else if (state.resultCode === 100) {
            props.setMode(false)
            dispatch(setResultCode(-1))
        }
    }, [state.resultCode])

    if (warning) {
        warningElem = <Alert className={s.fit_warning} type="error" message={warning} />
    }
    const onFinish = (e: FieldType) => {
        if (e.password === e.passwordRepeat) {
            const accessLayerId = e.accessLayerId ? 0 : 1
            dispatch(addUserThunk(e.login, e.password, accessLayerId))
        } else {
            setWarning("Пароли не совпадают!")
        }
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
                        <h2>Добавить учётную запись</h2>
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
                                className={s.field}
                                name="login"
                                rules={[{ required: true, message: 'Введите имя пользователя!' }]}
                            >
                                <Input className={s.input} placeholder="логин" />
                            </Form.Item>
                            <Form.Item<FieldType>
                                className={s.field}
                                name="password"
                                rules={[{ required: true, message: 'Введите ваш пароль!' }]}
                            >
                                <Input.Password className={s.input} placeholder="пароль" />
                            </Form.Item>
                            <Form.Item<FieldType>
                                className={s.field}
                                name="passwordRepeat"
                                rules={[{ required: true, message: 'Введите ваш пароль!' }]}
                            >
                                <Input.Password className={s.input} placeholder="повторите пароль" />
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="accessLayerId"
                                className={s.checkbox_field}
                                valuePropName="checked"
                            >
                                <Checkbox className={s.checkbox}>администратор</Checkbox>
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
    login: string,
    password: string,
    passwordRepeat: string,
    accessLayerId: string
}

export default UserAddForm