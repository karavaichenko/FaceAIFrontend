import { Button } from 'antd'
import s from './Windows.module.css'
import { useAppDispatch } from '../../../../../Store/hooks'
import { useEffect, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteEmployeeThunk } from '../../../../../Store/employeesReducer'

type PropsType = {
    setDeleteConfirm: React.Dispatch<SetStateAction<boolean>>,
    id: number | undefined
}

const DeleteConfirm = (props: PropsType) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (props.id === undefined) {
            navigate(-1)
        }
    }, [props.id])

    const dispatch = useAppDispatch()
    const deleteOnClick = () => {
        if (props.id != undefined) {
            dispatch(deleteEmployeeThunk(props.id))
        }
    }

    return (
        <div className={s.container}>
            <div className={s.form_container}>
                <div className={s.label}>Удалить?</div>
                <div className={s.btn_container}>
                    <Button onClick={deleteOnClick} type='primary' danger={true}>Подтвердить</Button>
                    <Button onClick={() => {props.setDeleteConfirm(false)}}>Назад</Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirm