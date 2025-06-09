import { Button } from "antd"
import s from "./Header.module.css"
import { selectUserState } from "../../Store/selectors"
import { useSelector } from "react-redux"
import { LogoutOutlined } from "@ant-design/icons"
import { logoutThunk } from "../../Store/userReducer"
import { useAppDispatch } from "../../Store/hooks"

const Header = () => {

    const state = useSelector(selectUserState)
    const dispatch = useAppDispatch()

    const logoutOnClick = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={s.container}>
            <div className={s.logo}>
                FaceDetector
            </div>
            {state.resultCode === 1000 ?
            <div className={s.user_container}>
                <div className={s.login}>{state.login}</div>
                <Button onClick={logoutOnClick} className={s.logout} type="default" shape="circle"><LogoutOutlined size={100} /></Button>
            </div> :
            <div></div>
            }
        </div>
    )
}

export default Header