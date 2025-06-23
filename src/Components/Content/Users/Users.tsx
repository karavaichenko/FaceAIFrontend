import { Button, Pagination } from "antd"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../Store/hooks"
import Menu from "../Menu/Menu"
import s from './Users.module.css'
import { selectUsersState } from "../../../Store/selectors"
import { useEffect, type SetStateAction } from "react"
import { getUsers } from "../../../Store/usersReducer"
import { Link, useSearchParams } from "react-router-dom"

type PropsType = {
    setMode: React.Dispatch<SetStateAction<boolean>>
}

const Users = (props: PropsType) => {

    const dispatch = useAppDispatch()
    const state = useSelector(selectUsersState)

    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const onPageChange = (page: number, ) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("page", String(page))
        setSearchParams(newParams)
        dispatch(getUsers(page))
    }

    useEffect(() => {
        dispatch(getUsers(page))
    }, [])


    const usersElem = state.users.map((e) => {
        return (
            <Link key={e.id} to={`/user?id=${e.id}`} className={s.item}>
                <div className={s.item_record}>{e.id}</div>
                <div className={s.item_record}>{e.login}</div>
                <div className={s.item_record}>{e.accessLayer === 0 ? "Полные" : "Частичные"}</div>
            </Link>
        )
    })

    return (
        <div>
            <Menu />
            <div className={s.container}>
                <div className={s.header}>
                    <h4 className={s.header_item}>ID</h4>
                    <h4 className={s.header_item}>Логин</h4>
                    <h4 className={s.header_item}>Права доступа</h4>
                </div>
                {usersElem}
                <div className={s.add_btn}>
                    <Button onClick={() => {props.setMode(true)}} type="primary" size="large">Добавить</Button>
                </div>
                <div className={s.paginator}>
                    <Pagination onChange={onPageChange} total={state.count} current={page}/>
                </div>
            </div>
        </div>
    )
}

export default Users