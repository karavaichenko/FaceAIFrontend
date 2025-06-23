import { Link, useSearchParams } from "react-router-dom"
import Menu from "../Menu/Menu"
import s from './Employees.module.css'
import { useAppDispatch } from "../../../Store/hooks"
import { useSelector } from "react-redux"
import { selectEmployeesState } from "../../../Store/selectors"
import { useEffect, type SetStateAction } from "react"
import { getEmployees, getEmployeesPhotos, searchEmployeesThunk } from "../../../Store/employeesReducer"
import { Button, Input, Pagination } from "antd"


const { Search } = Input;

type PropsType = {
    setMode: React.Dispatch<SetStateAction<boolean>>
}


const Employees = (props: PropsType) => {

    const dispatch = useAppDispatch()
    const state = useSelector(selectEmployeesState)


    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    useEffect(() => {
        dispatch(getEmployees(page))
    }, [])
    useEffect(() => {
        const ids = state.employees.map((e) => {return e.id})
        dispatch(getEmployeesPhotos(ids))
    }, [state.employees])

    const onPageChange = (page: number, ) => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set("page", String(page))
        setSearchParams(newParams)
        dispatch(getEmployees(page))
    }

    const elems = state.employees.map((e, ind) => {
        return (
            <Link key={e.id} to={`/employee?id=${e.id}`} className={s.item}>
                <div className={s.item_record_image}>
                    <img src={state.photosUrl[ind]} className={s.image}></img>
                </div>
                <div className={s.item_record}>{e.name}</div>
                <div className={s.item_record}>{e.isAccess ? "разрешён" : "запрещён"}</div>
                <div className={s.item_record}>{e.info}</div>
            </Link>
        )
    })

    const onSearch = (value: string) => {
        if (value) {
            dispatch(searchEmployeesThunk(page, value))
        } else {
            dispatch(getEmployees(page))
        }
    }


    return (
        <div>
            <Menu />
            <div className={s.panel_container}>
                <Search className={s.search}
                placeholder="ФИО"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                onChange={(e) => {onSearch(e.target.value)}}
                />

                <Button onClick={() => {props.setMode(true)}} className={s.add_btn} type="primary" size="large">Добавить сотрудника</Button>

            </div>
            <div className={s.container}>
                <div className={s.header}>
                    <div className={s.header_item}>Фото</div>
                    <div className={s.header_item}>ФИО</div>
                    <div className={s.header_item}>Доступ</div>
                    <div className={s.header_item}>Доп. информация</div>
                </div>
                {elems}
                <div className={s.paginator}>
                    <Pagination onChange={onPageChange} total={state.count} current={page}/>
                </div>
            </div>
        </div>
    )
}

export default Employees