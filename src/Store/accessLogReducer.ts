import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction, UnknownAction } from "@reduxjs/toolkit" 
import type { RootState } from "./store"
import { accessLogsAPI, type AccessLogsResponseType } from "../Api/api"

type LogType ={
    id: number,
    name: string,
    time: string
    access: boolean
}

type LogsStateType = {
    resultCode: number,
    count: number,
    logs: Array<LogType>,
    page: number
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: LogsStateType = {
    resultCode: -1,
    count: 0,
    logs: [],
    page: 1
}

const accessLogSlice = createSlice({
    name: "accessLogs",
    initialState,
    reducers: {
        setLogsState: (state, newState: PayloadAction<AccessLogsResponseType>) => {
            state.count = newState.payload.count
            state.resultCode = newState.payload.resultCode
            state.logs = newState.payload.logs
        },
        setPage: (state, page: PayloadAction<number>) => {
            state.page = page.payload
        }
    }
})

export const {setLogsState} = accessLogSlice.actions

export const getAccessLogs = (page: number): AppThunk => (dispatch) => {
    accessLogsAPI.getLogs(page)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setLogsState(data.data))
        } else {
            // catch error
            alert("err")
        }
    })
}



export default accessLogSlice
