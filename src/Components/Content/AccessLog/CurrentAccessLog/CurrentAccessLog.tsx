import { Button } from 'antd'
import s from './CurrentAccessLog.module.css'
import Menu from '../../Menu/Menu'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentAccessLog, selectCurrentLogPhoto } from '../../../../Store/selectors'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../../Store/hooks'
import { getCurrentAccessLog, getLogPhotoThunk, resetCurrentLog } from '../../../../Store/accessLogReducer'

const CurrentAccessLog = () => {

    const navigate = useNavigate()
    const state = useSelector(selectCurrentAccessLog)
    const photoUrl = useSelector(selectCurrentLogPhoto)
    const dispatch = useAppDispatch()
    const [searchParams, ] = useSearchParams()
    const log_id = Number(searchParams.get('id'))
    useEffect(() => {
        dispatch(getCurrentAccessLog(log_id))
        dispatch(getLogPhotoThunk(log_id))

        return () => {
            dispatch(resetCurrentLog())
        }
    }, [])

    return (
        <div>
            <Menu />
            <div className={s.container}>
                <div>
                    {/* {warningElem} */}
                    <div className={s.form_container}>

                        <div className={s.log_container}>
                            <img className={s.photo} src={photoUrl ? photoUrl : undefined} alt="" />
                            <div className={s.data_conatiner}>

                                <div className={s.label}>
                                    ФИО: 
                                    <div className={s.data}>
                                        {state?.name}
                                    </div>
                                </div>

                                <div className={s.label}>
                                    Время: 
                                    <div className={s.data}>
                                        {state?.time}
                                    </div>
                                </div>

                                <div className={s.label}>
                                    Доступ: 
                                    <div className={s.data}>
                                        {state?.access ? "разрёшён" : "запрещён"}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                        <Button size='large' className={s.exit_btn} onClick={() => {navigate(-1)}}>Назад</Button>
                </div>
            </div>
        </div>
    )
}

export default CurrentAccessLog