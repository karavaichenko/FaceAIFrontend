import { useSelector } from 'react-redux'
import Menu from '../../Menu/Menu'
import s from './CurrentEmployee.module.css'
import { selectCurrentEmployee, selectCurrentEmployeePhoto } from '../../../../Store/selectors'
import { Button } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../Store/hooks'
import { getEmployeePhotoThunk, getEmployeeThunk } from '../../../../Store/employeesReducer'
import DeleteConfirm from './Windows/DeleteConfirm'

const CurrentEmployee = () => {

    const state = useSelector(selectCurrentEmployee)
    const photoUrl = useSelector(selectCurrentEmployeePhoto)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const [searchParams, ] = useSearchParams()
    const employee_id = Number(searchParams.get('id')) || 1

    useEffect(() => {
        dispatch(getEmployeeThunk(employee_id))
        dispatch(getEmployeePhotoThunk(employee_id))
    }, [])


    return (
        <div>
            <Menu />
            <div className={s.container}>
                <div>
                    {/* {warningElem} */}
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
                                <div>
                                    {state?.isAccess}
                                </div>

                                </div>
                            </div>


                        </div>
                        <div className={s.btn_container}>

                            <Button type='primary'>Изменить данные</Button>
                            <Button>Загрузить фото</Button>
                            <Button onClick={() => {setDeleteConfirm(true)}} className={s.delete_btn} type='primary' danger={true}>Удалить</Button>

                        </div>
                    </div>
                        <Button size='large' className={s.exit_btn} onClick={() => {navigate(-1)}}>Назад</Button>
                </div>
            </div>

            {deleteConfirm ? <DeleteConfirm setDeleteConfirm={setDeleteConfirm} id={state?.id} /> : null}
            {/* {changePasswConfirm ? <ChangePasswConfirm resultCode={resultCode} id={state?.id} setChangePasswConfirm={setChangePasswConfirm}/> : null} */}
            {/* {changeAccessConfirm ? <ChangeAccessConfirm resultCode={resultCode} setChangeAccessConfirm={setChangeAccessConfirm} id={state?.id} accessLayer={state?.accessLayer} /> : null} */}
        </div>
    )
}

export default CurrentEmployee