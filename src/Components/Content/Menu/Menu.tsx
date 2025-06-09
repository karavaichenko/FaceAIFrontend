import { Link, useLocation } from 'react-router-dom'
import s from './Menu.module.css'
import { useSelector } from 'react-redux'
import { selectUserState } from '../../../Store/selectors'

const Menu = () => {

    const state = useSelector(selectUserState)
    const location = useLocation()
    const locationArr = location.pathname.split("/")
    const currentTab = locationArr[1]

    return (
        <div>
            {state.accessLayerId === 0 ?
            <div className={s.container}>
                <Link to="/employees" className={currentTab == "employees" ? s.active_item : s.item}>
                    <div>Сотрудники</div>
                </Link>
                <Link to="/" className={currentTab == "" ? s.active_item : s.item}>
                    <div>Проходы</div>
                </Link>
                <Link to="/users" className={currentTab == "users" ? s.active_item : s.item}>
                    <div>Учетные записи</div>
                </Link>
            </div> : null}
        </div>
    )
}

export default Menu