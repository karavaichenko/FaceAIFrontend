import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

export const userAPI = {
    loginApi: (login: string, password: string) => {
        return instance.post<LoginResponseType>("auth/login", { login: login, password: password })
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
    },
    getCurrentLog: (id: number) => {
        return instance.get<CurrentLogResponseType>(`accessLog?id=${id}`)
    },
    getAccessLogPhoto: (id: number) => {
        return axios.get(`/accessLog/photo?id=${id}&t=${Date.now()}`, {
            responseType: "blob",
            baseURL: "http://localhost:8000/",
            withCredentials: true,
        });
    },
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

export type CurrentLogResponseType = {
    id: number
    name: string
    time: string
    access: boolean
    resultCode: number
}

export const employeesAPI = {
    getEmployees: (page: number) => {
        return instance.get<EmployeesResponseType>(`employees?page=${page}`)
    },
    searchEmployees: (page: number, substr: string) => {
        return instance.get<EmployeesResponseType>(`employees?page=${page}&substr=${substr}`)
    },
    getEmployeePhoto: (id: number) => {
        return axios.get(`/employees/photo?id=${id}&t=${Date.now()}`, {
            responseType: "blob",
            baseURL: "http://localhost:8000/",
            withCredentials: true,
        });
    },
    getEmployee: (id: number) => {
        return instance.get<EmployeeResponseType>(`/employee?id=${id}`)
    },
    postEmployee: (name: string, info: string, isAccess: boolean) => {
        return instance.post<EmployeePostResponseType>('/employees', { name: name, info: info, isAccess: isAccess })
    },
    postEmployeePhoto: (id: number, formData: FormData) => {
        return axios.post<RequestResultType>(`/employees/photo?id=${id}`, formData, {
            baseURL: "http://localhost:8000/",
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    deleteEmployee: (id: number) => {
        return instance.delete<RequestResultType>(`/employee?id=${id}`)
    },
    updateEmployeeData: (id: number, name: string, info: string, isAccess: boolean) => {
        return instance.put<RequestResultType>('/employee', {id: id, name: name, info: info, isAccess: isAccess})
    }
}

type EmployeePostResponseType = {
    id: number,
    resultCode: number
}

type EmployeeType = {
    id: number,
    name: string,
    info: string,
    isAccess: boolean,
}

type EmployeeResponseType = {
    id: number,
    name: string,
    info: string,
    isAccess: boolean,
    resultCode: number
}

export type EmployeesResponseType = {
    resultCode: number,
    count: number,
    employees: Array<EmployeeType>
}

export const usersAPI = {
    getUsers: (page: number) => {
        return instance.get<UsersResponseType>(`users?page=${page}`)
    },
    addUser: (login: string, password: string, accessLayerId: number) => {
        return instance.post<RequestResultType>('users', { login, password, accessLayerId })
    },
    getUser: (id: number) => {
        return instance.get<UserResponseType>(`user?id=${id}`)
    },
    deleteUser: (id: number) => {
        return instance.delete<RequestResultType>(`user?id=${id}`)
    },
    setNewPassword: (id: number, password: string) => {
        return instance.post<RequestResultType>('user', { id, password })
    },
    setAccessLayer: (id: number, accessLayerId: number) => {
        return instance.put<RequestResultType>('user', { id, accessLayerId })
    }
}

type RequestResultType = {
    resultCode: number
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


