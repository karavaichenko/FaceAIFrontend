import { Alert, Button } from 'antd'
import s from './Windows.module.css'
import { useEffect, useState, type SetStateAction } from 'react'
import EmployeePhotoUpload from '../../EmployeePhotoUpload'
import { useAppDispatch } from '../../../../../Store/hooks'
import { postEmployeePhotoThunk, setResultCode } from '../../../../../Store/employeesReducer'
import { useSelector } from 'react-redux'
import { selectEmployeeResultCode } from '../../../../../Store/selectors'

type PropsType = {
    setChangePhoto: React.Dispatch<SetStateAction<boolean>>,
    id: number | undefined
}

const ChangePhotoForm = (props: PropsType) => {

    const resultCode = useSelector(selectEmployeeResultCode)
    const [file, setFile] = useState<File | null>(null);
    const [warning, setWarning] = useState("");
    const dispatch = useAppDispatch()

    let warningElem

    if (warning) {
        warningElem = <Alert className={s.fit_warning} type="error" message={warning} />
    }
    
    useEffect(() => {
            if (resultCode === 102) {
                props.setChangePhoto(false)
                dispatch(setResultCode(-1))
            } else if (resultCode === 1) {
                setWarning("Что-то пошло не так!")
            }
        }, [resultCode])

    const onSubmit = () => {
        if (props.id) {
            if (!file) {
                setWarning("Добавьте фото сотрудника!")
                return;
            }
            const formData = new FormData();
            formData.append('photo', file);
            dispatch(postEmployeePhotoThunk(props.id, formData))
        } else {
            props.setChangePhoto(false)
        }
    }

    return (
        <div className={s.container}>
            {warningElem}
            <div className={s.form_container}>
                <div className={s.label}>Загрузите новое фото</div>


                    <EmployeePhotoUpload setFile={setFile} setWarning={setWarning}/>


                <div className={s.btn_container}>
                    <Button onClick={() => {props.setChangePhoto(false)}} size='large'>Назад</Button>
                    <Button onClick={onSubmit} size='large' type='primary'>Подтвердить</Button>
                </div>
            </div>
        </div>
    )
}

export default ChangePhotoForm