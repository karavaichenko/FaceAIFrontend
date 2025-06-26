import { Link, useSearchParams } from 'react-router-dom'
import Menu from '../Menu/Menu'
import s from './AccessLog.module.css'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../Store/hooks'
import { getAccessLogs, getAccessLogsPhotos } from '../../../Store/accessLogReducer'
import { useSelector } from 'react-redux'
import { selectLogsState } from '../../../Store/selectors'
import { Pagination } from 'antd'


const AccessLog = () => {

    const state = useSelector(selectLogsState)
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const onPageChange = (page: number, ) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("page", String(page))
        setSearchParams(newParams)
        dispatch(getAccessLogs(page))
    }
    
    useEffect(() => {
        dispatch(getAccessLogs(page))
    }, [])
    useEffect(() => {
        const ids = state.logs.map((e) => {return e.id})
        dispatch(getAccessLogsPhotos(ids))
    }, [state.logs])
    


    const logsElem = state.logs.map((e, ind) => {
        return (
            <Link key={e.id} to={`/access?id=${e.id}`} className={s.item}>
                <div className={s.item_record_img}>
                    <img className={s.image} src={state.photosUrl[ind]} alt="" />
                </div>
                <div className={s.item_record}>{e.name}</div>
                <div className={s.item_record}>{e.access ? "Разрешён" : "Не разрешён"}</div>
                <div className={s.item_record}>{e.time}</div>
            </Link>
        )
    })
    return (
        <div>
            <Menu />
            <div className={s.container}>
                <div className={s.header}>
                    <h4 className={s.header_item}>Фото</h4>
                    <h4 className={s.header_item}>Имя сотрудника</h4>
                    <h4 className={s.header_item}>Доступ</h4>
                    <h4 className={s.header_item}>Время</h4>
                </div>
                {logsElem}
                <div className={s.paginator}>
                    <Pagination onChange={onPageChange} total={state.count} current={page}/>
                </div>
            </div>
        </div>
    )
}

export default AccessLog