import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction, UnknownAction } from "@reduxjs/toolkit" 
import type { RootState } from "./store"
import { accessLogsAPI, type AccessLogsResponseType, type CurrentLogResponseType } from "../Api/api"

type LogType ={
    id: number,
    name: string,
    time: string
    access: boolean
}

type LogsStateType = {
    resultCode: number,
    currentLog: LogType | null,
    currentLogPhoto: string | null,
    count: number,
    logs: Array<LogType>,
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: LogsStateType = {
    currentLogPhoto: null, 
    currentLog: null,
    resultCode: -1,
    count: 0,
    logs: [],
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
        setCurrentLog: (state, currentLog: PayloadAction<CurrentLogResponseType>) => {
            state.currentLog = currentLog.payload
        },
        setCurrentLogPhoto: (state, photoUrl: PayloadAction<string>) => {
            state.currentLogPhoto = photoUrl.payload
        },
        resetCurrentLog: (state) => {
            state.currentLog = initialState.currentLog
            state.currentLogPhoto = initialState.currentLogPhoto
        }
    }
})

export const {setLogsState, setCurrentLog, setCurrentLogPhoto, resetCurrentLog} = accessLogSlice.actions

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

export const getCurrentAccessLog = (id: number): AppThunk => (dispatch) => {
    accessLogsAPI.getCurrentLog(id)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setCurrentLog(data.data))
        } else {
            // 
        }
    })
}

export const getLogPhotoThunk = (id: number): AppThunk => (dispacth) => {
    accessLogsAPI.getAccessLogPhoto(id)
    .then((data) => {
        dispacth(setCurrentLogPhoto(URL.createObjectURL(data.data)))
    })
}


export default accessLogSlice
