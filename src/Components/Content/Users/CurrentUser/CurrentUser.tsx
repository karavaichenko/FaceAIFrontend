import { useSelector } from 'react-redux'
import Menu from '../../Menu/Menu'
import s from './CurrentUser.module.css'
import { selectCurrentUser, selectUserResultCode } from '../../../../Store/selectors'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../Store/hooks'
import { getUserThunk, resetCurrentUser } from '../../../../Store/usersReducer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Switch } from 'antd'
import DeleteConfirm from './Windows/DeleteConfirm'
import ChangePasswConfirm from './Windows/ChangePasswConfirm'
import ChangeAccessConfirm from './Windows/ChangeAccessConfirm'

const CurrentUser = () => {

    const state = useSelector(selectCurrentUser)
    const resultCode = useSelector(selectUserResultCode)
    const dispatch = useAppDispatch()

    const [searchParams, ] = useSearchParams()
    const user_id = Number(searchParams.get('id'))
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserThunk(user_id))
        return () => {
            dispatch(resetCurrentUser())
        }
    }, [])


    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [changePasswConfirm, setChangePasswConfirm] = useState(false)
    const [changeAccessConfirm, setChangeAccessConfirm] = useState(false)
    return (
        <div>
            <Menu />
            <div className={s.container}>
                <div>
                    {/* {warningElem} */}
                    <div className={s.form_container}>

                        <div className={s.info_container}>
                            <div className={s.label_container}>
                                <div className={s.label}>Логин:</div>
                                <div>{state?.login}</div>
                            </div>
                            <div className={s.label_container}>
                                <div className={s.label}>Уровень доступа:</div>
                                <div>{state?.accessLayer === 0 ? "администратор" : "оператор"}</div>
                            </div>
                        </div>
                        {state?.login !== "admin" ?
                        <div className={s.btn_container}>

                            <div className={s.switch_container}>
                                <div className={s.label}>Администратор</div>
                                <Switch value={state?.accessLayer === 0} onChange={() => {setChangeAccessConfirm(true)}} />
                            </div>
                            <Button danger={true} onClick={() => {setChangePasswConfirm(true)}}>Изменить пароль</Button>
                            <Button className={s.delete_btn} onClick={() => setDeleteConfirm(true)} type='primary' danger={true}>Удалить</Button>

                        </div>
                        :
                            <Button className={s.password_btn} danger={true} onClick={() => {setChangePasswConfirm(true)}}>Изменить пароль</Button>

                        }


                    </div>
                        <Button size='large' className={s.exit_btn} onClick={() => {navigate(-1)}}>Назад</Button>
                </div>
            </div>

            {deleteConfirm ? <DeleteConfirm setDeleteConfirm={setDeleteConfirm} id={state?.id} /> : null}
            {changePasswConfirm ? <ChangePasswConfirm resultCode={resultCode} id={state?.id} setChangePasswConfirm={setChangePasswConfirm}/> : null}
            {changeAccessConfirm ? <ChangeAccessConfirm resultCode={resultCode} setChangeAccessConfirm={setChangeAccessConfirm} id={state?.id} accessLayer={state?.accessLayer} /> : null}
        </div>
    )
}

export default CurrentUser