import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

export const userAPI = {
    loginApi: (login: string, password: string) => {
        return instance.post<LoginResponseType>("auth/login", {login: login, password: password})
    },
    logoutApi: () => {
        return instance.delete("auth/logout")
    },
    authApi: () => {
        return instance.get<LoginResponseType>("auth")
    }
}

type LoginResponseType = {
    login: string,
    accessLayerId: number
    resultCode: number
}

export const accessLogsAPI = {
    getLogs: (page: number) => {
        return instance.get<AccessLogsResponseType>(`accessLogs?page=${page}`)
    }
}

export type AccessLogsResponseType = {
    resultCode: number,
    count: number,
    logs: Array<LogResponseType>
}

type LogResponseType = {
    id: number,
    name: string,
    time: string
    access: boolean
}

export const employeesAPI = {
    getEmployees: (page: number) => {
        return instance.get<EmployeesResponseType>(`employees?page=${page}`)
    }
}

type EmployeeResponseType = {
    id: number,
    name: string,
    info: string,
    is_access: boolean,
}

export type EmployeesResponseType = {
    resultCode: number,
    count: number,
    employees: Array<EmployeeResponseType>
}

export const usersAPI = {
    getUsers: (page: number) => {
        return instance.get<UsersResponseType>(`users?page=${page}`)
    }
}

type UserResponseType = {
    id: number,
    login: string,
    accessLayer: number
}

export type UsersResponseType = {
    users: Array<UserResponseType>,
    count: number,
    resultCode: number
}


