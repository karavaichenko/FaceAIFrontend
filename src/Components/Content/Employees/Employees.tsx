import { Link, useSearchParams } from "react-router-dom"
import Menu from "../Menu/Menu"
import s from './Employees.module.css'
import { useAppDispatch } from "../../../Store/hooks"
import { useSelector } from "react-redux"
import { selectEmployeesState } from "../../../Store/selectors"
import { useEffect } from "react"
import { getEmployees } from "../../../Store/employeesReducer"

const Employees = () => {

    const dispatch = useAppDispatch()
    const state = useSelector(selectEmployeesState)


    
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    useEffect(() => {
        dispatch(getEmployees(page))
    }, [])


    const elems = state.employees.map((e) => {
        return (
            <Link to={`employees?page=${e.id}`} className={s.item}>
                <img className={s.item_record_image}>

                </img>
                <div className={s.item_record}>{e.name}</div>
                <div className={s.item_record}>{e.is_access}</div>
                <div className={s.item_record}>{e.info}</div>
            </Link>
        )
    })


    return (
        <div>
            <Menu />
            <div className={s.container}>
                <div className={s.header}>
                    <div className={s.header_item}>Фото</div>
                    <div className={s.header_item}>ФИО</div>
                    <div className={s.header_item}>Доступ</div>
                    <div className={s.header_item}>Доп. информация</div>
                </div>
                {elems}
                <Link to="/access/2" className={s.item}>
                    <img className={s.item_record_image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&s" alt="" />
                    <div className={s.item_record}>Иван Каравайченко</div>
                    <div className={s.item_record}>Доп информации нет</div>
                </Link>
            </div>
        </div>
    )
}

export default Employees