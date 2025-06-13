import { useNavigate } from 'react-router-dom'
import s from './Windows.module.css'
import { useEffect, useState, type SetStateAction } from 'react'
import { useAppDispatch } from '../../../../../Store/hooks'
import { Button, Input } from 'antd'
import { setNewPasswordThunk } from '../../../../../Store/usersReducer'
import { setResultCode } from '../../../../../Store/usersReducer'

type PropsType = {
    id: number | undefined,
    resultCode: number,
    setChangePasswConfirm: React.Dispatch<SetStateAction<boolean>>
}


const ChangePasswConfirm = (props: PropsType) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (props.id === undefined) {
            navigate(-1)
        }
        if (props.resultCode === 102) {
            props.setChangePasswConfirm(false)
            dispatch(setResultCode(-1))
        }
    }, [props.id, props.resultCode])

    const [newPassword, setNewPassword] = useState<string>("")

    const dispatch = useAppDispatch()
    const setNewPasswOnClick = () => {
        if (props.id !== undefined) {
            // проверка пароля
            dispatch(setNewPasswordThunk(props.id, newPassword))
        }        
    }

    return (
        <div className={s.container}>
            <div className={s.form_container}>
                <div className={s.label}>Введите новый пароль</div>
                <Input placeholder='новый пароль' value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
                <div className={s.btn_container}>
                    <Button onClick={setNewPasswOnClick} type='primary'>Подтвердить</Button>
                    <Button onClick={() => {props.setChangePasswConfirm(false)}}>Назад</Button>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswConfirm