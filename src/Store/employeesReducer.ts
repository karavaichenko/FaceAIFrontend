import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction, UnknownAction } from "@reduxjs/toolkit" 
import type { RootState } from "./store"
import { employeesAPI, type EmployeesResponseType } from "../Api/api"

type EmployeeType ={
    id: number,
    name: string,
    info: string,
    is_access: boolean
}

type EmployeesStateType = {
    resultCode: number,
    count: number,
    employees: Array<EmployeeType>,
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: EmployeesStateType = {
    resultCode: -1,
    count: 0,
    employees: []
}

const employeesSlice = createSlice({
    name: "accessLogs",
    initialState,
    reducers: {
        setEmployeesState: (state, newState: PayloadAction<EmployeesResponseType>) => {
            state.count = newState.payload.count
            state.resultCode = newState.payload.resultCode
            state.employees = newState.payload.employees
        },
    }
})

export const {setEmployeesState} = employeesSlice.actions

export const getEmployees = (page: number): AppThunk => (dispatch) => {
    employeesAPI.getEmployees(page)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setEmployeesState(data.data))
        } else {
            // catch error
            alert("err")
        }
    })
}



export default employeesSlice
