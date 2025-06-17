import type { RootState } from "./store";

export const selectUserState = (state: RootState) => {
    return state.user
}

export const selectLogsState = (state: RootState) => {
    return state.accessLogs
}

export const selectEmployeesState = (state: RootState) => {
    return state.employees
}

export const selectCurrentEmployee = (state: RootState) => {
    return state.employees.currentEmployee
}

export const selectCurrentEmployeePhoto = (state: RootState) => {
    return state.employees.currentEmployeePhoto
}

export const selectUsersState = (state: RootState) => {
    return state.users
}

export const selectCurrentUser = (state: RootState) => {
    return state.users.currentUser
}

export const selectUserResultCode = (state: RootState) => {
    return state.users.resultCode
}