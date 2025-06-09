import { Alert, Button, Form, Input } from 'antd'
import Header from '../Header/Header'
import s from './Login.module.css'
import { useAppDispatch } from '../../Store/hooks'
import { authThunk, loginThunk } from '../../Store/userReducer'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserState } from '../../Store/selectors'

const Login = () => {

    const dispatch = useAppDispatch()

    const onFinish = (e: FieldType) => {
        dispatch(loginThunk(e.login, e.password))
    }

    const onFinishFailed = () => {
        
    }

    const state = useSelector(selectUserState)

    useEffect(() => {
        dispatch(authThunk())
    }, [])

    const [warning, setWarning] = useState("");
    let warningElem
    useEffect(() => {
        if (state.resultCode === 1) {
            setWarning("Такого аккаунта не существует!")
        } else if (state.resultCode === 2) {
            setWarning("Что-то введено неверно!")
        }
    }, [state.resultCode])

    if (warning) {
        warningElem = <Alert className={s.fit_warning} type="error" message={warning} />
    }



    return (
        <div>
            <Header />
            {state.resultCode === -1 ? <div></div> : 
            <div className={s.container}>
                <div>
                    {warningElem}
                    <div className={s.form_container}>
                        <h2>Авторизация</h2>
                        <Form
                        className={s.form}
                        size="large"
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        >
                        <Form.Item<FieldType>
                            className={s.field}
                            name="login"
                            rules={[{ required: true, message: 'Введите имя пользователя!' }]}
                            >
                            <Input className={s.input} placeholder="login" />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className={s.field}
                            name="password"
                            rules={[{ required: true, message: 'Введите ваш пароль!' }]}
                            >
                            <Input.Password className={s.input} placeholder="password" />
                        </Form.Item>
                        <Form.Item className={s.submit}>
                            <Button type="primary" htmlType="submit" size="large">
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </div>
            </div>
            }
        </div> 
    )
}

type FieldType = {
    login: string,
    password: string
}

export default Login