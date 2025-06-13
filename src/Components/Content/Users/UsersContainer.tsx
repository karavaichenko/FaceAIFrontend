import { useState } from "react"
import Users from "./Users"
import UserAddForm from "./UserAddForm"

const UsersContainer = () => {

    const [mode, setMode] = useState(false)

    return (
        mode ? <UserAddForm setMode={setMode} /> : <Users setMode={setMode} />
    )
}

export default UsersContainer