import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction, UnknownAction } from "@reduxjs/toolkit" 
import type { RootState } from "./store"
import { usersAPI, type UsersResponseType } from "../Api/api"

type UserType ={
    id: number,
    login: string,
    accessLayer: number
}

type UsersStateType = {
    resultCode: number,
    count: number,
    users: Array<UserType>,
    page: number,
    currentUser: UserType | null
}


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>

const initialState: UsersStateType = {
    resultCode: -1,
    count: 0,
    users: [],
    page: 1,
    currentUser: null
}

const usersSlice = createSlice({
    name: "accessLogs",
    initialState,
    reducers: {
        setUsersState: (state, newState: PayloadAction<UsersResponseType>) => {
            state.count = newState.payload.count
            state.resultCode = newState.payload.resultCode
            state.users = newState.payload.users
        },
        setPage: (state, page: PayloadAction<number>) => {
            state.page = page.payload
        },
        setResultCode: (state, resultCode: PayloadAction<number>) => {
            state.resultCode = resultCode.payload
        },
        setCurrentUser: (state, user: PayloadAction<UserType>) => {
            state.currentUser = user.payload
        },
        deleteUser: (state) => {
            state.currentUser = null
        },
        setUserAccessLayer: (state, accessLayer: PayloadAction<number>) => {
            if (state.currentUser !== null) {
                state.currentUser.accessLayer = accessLayer.payload
            }
        }
    }
})

export const {setUsersState, setResultCode, setCurrentUser, deleteUser, setUserAccessLayer} = usersSlice.actions

export const getUsers = (page: number): AppThunk => (dispatch) => {
    usersAPI.getUsers(page)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setUsersState(data.data))
        } else {
            // catch error
            alert("err")
        }
    })
}

export const addUserThunk = (login: string, password: string, accesslayerId: number): AppThunk => (dispatch) => {
    usersAPI.addUser(login, password, accesslayerId)
    .then((data) => {
        dispatch(setResultCode(data.data.resultCode))
    })
}

export const getUserThunk = (id: number): AppThunk => (dispatch) => {
    usersAPI.getUser(id)
    .then((data) => {
        dispatch(setCurrentUser(data.data))
    })
}

export const deleteUserThunk = (id: number): AppThunk => (dispatch) => {
    usersAPI.deleteUser(id)
    .then((data) => {
        if (data.data.resultCode === 101) {
            dispatch(deleteUser())
        } else {
            // 
        }
    })
} 

export const setNewPasswordThunk = (id: number, password: string): AppThunk => (dispatch) => {
    usersAPI.setNewPassword(id, password)
    .then((data) => {
        dispatch(setResultCode(data.data.resultCode))
    })
}

export const setUserAccessThunk = (id: number, accessLayerId: number): AppThunk => (dispatch) => {
    usersAPI.setAccessLayer(id, accessLayerId)
    .then((data) => {
        dispatch(setResultCode(data.data.resultCode))
        dispatch(setUserAccessLayer(accessLayerId))
    })
}

export default usersSlice
