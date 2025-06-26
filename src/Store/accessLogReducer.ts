import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction, UnknownAction } from "@reduxjs/toolkit" 
import type { RootState } from "./store"
import { accessLogsAPI, type AccessLogsResponseType, type CurrentLogResponseType } from "../Api/api"
import { authThunk } from "./userReducer"

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
    photosUrl: Array<string>
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: LogsStateType = {
    photosUrl: [],
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
        }, 
        setAccessLogsPhotos: (state, urls: PayloadAction<Array<string>>) => {
            state.photosUrl = urls.payload
        }
    }
})

export const {setLogsState, setCurrentLog, setCurrentLogPhoto, resetCurrentLog, setAccessLogsPhotos} = accessLogSlice.actions

export const getAccessLogs = (page: number): AppThunk => (dispatch) => {
    accessLogsAPI.getLogs(page)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setLogsState(data.data))
        } else {
            if (data.data.resultCode === 3) {
                dispatch(authThunk())
            }
        }
    })
}

export const getCurrentAccessLog = (id: number): AppThunk => (dispatch) => {
    accessLogsAPI.getCurrentLog(id)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setCurrentLog(data.data))
        } else {
            if (data.data.resultCode === 3) {
                dispatch(authThunk())
            }
        }
    })
}

export const getLogPhotoThunk = (id: number): AppThunk => (dispacth) => {
    accessLogsAPI.getAccessLogPhoto(id)
    .then((data) => {
        dispacth(setCurrentLogPhoto(URL.createObjectURL(data.data)))
    })
}

export const getAccessLogsPhotos = (ids: number[]): AppThunk => async (dispatch) => {
    try {
        const photosPromises = ids.map(async (id) => {
            try {
                const resposne = await accessLogsAPI.getAccessLogPhoto(id)
                return URL.createObjectURL(resposne.data)
            } catch (error) {
                console.error(`Ошибка загрузки фото для лога ${id}:`, error);
                return ''
            }
        })

        const photosUrls = await Promise.all(photosPromises)
        dispatch(setAccessLogsPhotos(photosUrls))
    } catch (error) {
        console.error("Ошибка в getAccessLogsPhotos: ", error);
    }
}


export default accessLogSlice
