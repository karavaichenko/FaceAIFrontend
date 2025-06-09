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
    page: number
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
    page: 1
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
        }
    }
})

export const {setUsersState} = usersSlice.actions

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



export default usersSlice
