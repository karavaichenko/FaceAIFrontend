import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userReducer";
import accessLogSlice from "./accessLogReducer";
import employeesSlice from "./employeesReducer";
import usersSlice from "./usersReducer";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        accessLogs: accessLogSlice.reducer,
        employees: employeesSlice.reducer,
        users: usersSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store