import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction, UnknownAction } from "@reduxjs/toolkit" 
import type { RootState } from "./store"
import { userAPI } from "../Api/api"


type UserStateType = {
    login: string | null,
    accessLayerId: number | null
    resultCode: number
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: UserStateType = {
    login: null,
    accessLayerId: null,
    resultCode: -1,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, login: PayloadAction<string>) => {
            state.login = login.payload
        },
        setAccessLayerId: (state, accessLayerId: PayloadAction<number>) => {
            state.accessLayerId = accessLayerId.payload
        },
        logout: (state) => {
            state.login = null
            state.resultCode = -1
        },
        setResultCode: (state, resultCode: PayloadAction<number>) => {
            state.resultCode = resultCode.payload
        }
    }
})

export const {setLogin, setAccessLayerId, logout, setResultCode} = userSlice.actions

export const loginThunk = (login: string, password: string): AppThunk => (dispatch) => {
    userAPI.loginApi(login, password)
    .then((data) => {
        if (data.data.resultCode === 1000) {
            dispatch(setLogin(login))
            dispatch(setResultCode(data.data.resultCode))
            dispatch(setAccessLayerId(data.data.accessLayerId))
        } else {
            dispatch(setResultCode(data.data.resultCode))
        }
    })
}

export const logoutThunk = (): AppThunk => (dispatch) => {
    userAPI.logoutApi()
    .then(() => {
        dispatch(logout())
    })
}

export const authThunk = (): AppThunk => (dispatch) => {
    userAPI.authApi()
    .then((data) => {
        if (data.data.resultCode === 1000) {
            dispatch(setLogin(data.data.login))
            dispatch(setAccessLayerId(data.data.accessLayerId))
            dispatch(setResultCode(data.data.resultCode))
        } else {
            dispatch(setResultCode(data.data.resultCode))
        }
    }) 
}


export default userSlice
