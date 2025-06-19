import type { RootState } from "./store";

export const selectUserState = (state: RootState) => {
    return state.user
}

// Logs selectors

export const selectLogsState = (state: RootState) => {
    return state.accessLogs
}

export const selectCurrentAccessLog = (state: RootState) => {
    return state.accessLogs.currentLog
}

export const selectCurrentLogPhoto = (state: RootState) => {
    return state.accessLogs.currentLogPhoto
}

// Employees selectors

export const selectEmployeesState = (state: RootState) => {
    return state.employees
}

export const selectCurrentEmployee = (state: RootState) => {
    return state.employees.currentEmployee
}

export const selectCurrentEmployeePhoto = (state: RootState) => {
    return state.employees.currentEmployeePhoto
}

export const selectEmployeeResultCode = (state: RootState) => {
    return state.employees.resultCode
}

// Users selectors

export const selectUsersState = (state: RootState) => {
    return state.users
}

export const selectCurrentUser = (state: RootState) => {
    return state.users.currentUser
}

export const selectUserResultCode = (state: RootState) => {
    return state.users.resultCode
}