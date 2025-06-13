import { useEffect, type SetStateAction } from 'react'
import s from './Windows.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../../Store/hooks'
import { Button } from 'antd'
import { setUserAccessThunk } from '../../../../../Store/usersReducer'
import { setResultCode } from '../../../../../Store/usersReducer'


type PropsType = {
    setChangeAccessConfirm: React.Dispatch<SetStateAction<boolean>>,
    id: number | undefined,
    accessLayer: number | undefined,
    resultCode: number
}

const ChangeAccessConfirm = (props: PropsType) => {

    const navigate = useNavigate()
    useEffect(() => {
        if (props.id === undefined) {
            navigate(-1)
        }
        if (props.resultCode === 102) {
            props.setChangeAccessConfirm(false)
            dispatch(setResultCode(-1))
        }
    }, [props.id, props.resultCode])

    const dispatch = useAppDispatch()
    const changeAccessOnClick = () => {
        if (props.id != undefined) {
            dispatch(setUserAccessThunk(props.id, props.accessLayer === 0 ? 1 : 0))
        }
    }

    return (
        <div className={s.container}>
            <div className={s.form_container}>
                <div className={s.label}>Изменить права доступа на {props.accessLayer === 0 ? '"оператор"' : '"администратор"'}</div>
                <div className={s.btn_container}>
                    <Button onClick={changeAccessOnClick} type='primary'>Подтвердить</Button>
                    <Button onClick={() => {props.setChangeAccessConfirm(false)}}>Назад</Button>
                </div>
            </div>
        </div>
    )
}   

export default ChangeAccessConfirm