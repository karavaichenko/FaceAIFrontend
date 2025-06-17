import { useState } from "react"
import Employees from "./Employees"
import EmployeeAddForm from "./EmployeeAddForm"


const EmployeesConatiner = () => {

    const [mode, setMode] = useState(false)

    if (mode) {
        return (
            <EmployeeAddForm setMode={setMode} />
        )
    } else {
        return (
            <Employees setMode={setMode} />
        )
    }
}

export default EmployeesConatiner