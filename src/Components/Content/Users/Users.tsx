import { Pagination } from "antd"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../Store/hooks"
import Menu from "../Menu/Menu"
import s from './Users.module.css'
import { selectUsersState } from "../../../Store/selectors"
import { useEffect } from "react"
import { getUsers } from "../../../Store/usersReducer"
import { Link, useSearchParams } from "react-router-dom"

const Users = () => {

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
        dispatch(getUsers(0))
    }, [])


    const usersElem = state.users.map((e) => {
        return (
            <Link to={`users?page=${e.id}`} className={s.item}>
                <div className={s.item_record}>{e.id}</div>
                <div className={s.item_record}>{e.login}</div>
                <div className={s.item_record}>{e.accessLayer}</div>
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
                <div className={s.paginator}>
                    <Pagination onChange={onPageChange} total={state.count} current={page}/>
                </div>
            </div>
        </div>
    )
}

export default Users