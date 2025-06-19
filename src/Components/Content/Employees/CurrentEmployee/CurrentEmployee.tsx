import { useSelector } from 'react-redux'
import Menu from '../../Menu/Menu'
import s from './CurrentEmployee.module.css'
import { selectCurrentEmployee, selectCurrentEmployeePhoto } from '../../../../Store/selectors'
import { Button } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../Store/hooks'
import { getEmployeePhotoThunk, getEmployeeThunk, resetCurrentEmployee, setCurrentEmployee } from '../../../../Store/employeesReducer'
import DeleteConfirm from './Windows/DeleteConfirm'
import ChangeInfoForm from './Windows/ChangeInfoForm'
import ChangePhotoForm from './Windows/ChangePhotoForm'

const CurrentEmployee = () => {

    const state = useSelector(selectCurrentEmployee)
    const photoUrl = useSelector(selectCurrentEmployeePhoto)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [changeInfoForm, setChangeInfoForm] = useState(false)
    const [changePhoto, setChangePhoto] = useState(false)

    const [searchParams, ] = useSearchParams()
    const employee_id = Number(searchParams.get('id'))

    useEffect(() => {
        dispatch(getEmployeeThunk(employee_id))
        dispatch(getEmployeePhotoThunk(employee_id))
        return () => {
            dispatch(resetCurrentEmployee())
        }
    }, [])
    useEffect(() => {
        dispatch(getEmployeePhotoThunk(employee_id))
    }, [changePhoto])


    return (
        <div>
            <Menu />
            <div className={s.container}>
                <div>
                    <div className={s.form_container}>
                        <div className={s.employee_container}>

                            <img className={s.photo} src={photoUrl ? photoUrl : undefined} alt="" />
                            <div className={s.labels_container}>
                                <div className={s.label}>
                                    ФИО: 
                                    <div className={s.data}>
                                        {state?.name}
                                    </div>
                                </div>
                                <div className={s.label}>
                                    Доп. информация: 
                                    <div className={s.data}>
                                        {state?.info}
                                    </div>
                                </div>
                                <div className={s.label}>
                                    Доступ: 
                                    <div className={s.data}>
                                        {state?.isAccess ? "разрешён" : "запрещён"}
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={s.btn_container}>

                            <Button size='large' type='primary' onClick={() => {setChangeInfoForm(true)}}>Изменить данные</Button>
                            <Button size='large' onClick={() => {setChangePhoto(true)}}>Загрузить фото</Button>
                            <Button size='large' onClick={() => {setDeleteConfirm(true)}} className={s.delete_btn} type='primary' danger={true}>Удалить</Button>

                        </div>
                    </div>
                        <Button size='large' className={s.exit_btn} onClick={() => {navigate(-1)}}>Назад</Button>
                </div>
            </div>

            {deleteConfirm ? <DeleteConfirm setDeleteConfirm={setDeleteConfirm} id={state?.id} /> : null}
            {changeInfoForm ? <ChangeInfoForm employee={state} setChangeInfo={setChangeInfoForm}/> : null}
            {changePhoto ? <ChangePhotoForm setChangePhoto={setChangePhoto} id={state?.id} /> : null}
        </div>
    )
}

export default CurrentEmployee