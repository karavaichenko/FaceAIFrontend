import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction, ThunkAction, UnknownAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import { employeesAPI, type EmployeesResponseType } from "../Api/api"

export type EmployeeType = {
    id: number,
    name: string,
    info: string,
    isAccess: boolean
}

type EmployeesStateType = {
    currentEmployee: EmployeeType | null,
    currentEmployeePhoto: string | null,
    resultCode: number,
    count: number,
    employees: Array<EmployeeType>,
    photosUrl: Array<string>
}


export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    UnknownAction
>

const initialState: EmployeesStateType = {
    currentEmployee: null,
    currentEmployeePhoto: null,
    resultCode: -1,
    count: 0,
    employees: [],
    photosUrl: []
}

const employeesSlice = createSlice({
    name: "accessLogs",
    initialState,
    reducers: {
        setEmployeesState: (state, newState: PayloadAction<EmployeesResponseType>) => {
            state.count = newState.payload.count
            state.resultCode = newState.payload.resultCode
            state.employees = newState.payload.employees
        },
        setEmployeesPhotos: (state, photosUrl: PayloadAction<Array<string>>) => {
            state.photosUrl = photosUrl.payload
        },
        setResultCode: (state, resultCode: PayloadAction<number>) => {
            state.resultCode = resultCode.payload
        },
        setCurrentEmployee: (state, employee: PayloadAction<EmployeeType>) => {
            state.currentEmployee = employee.payload
        }, 
        setCurrentEmployeePhoto: (state, photoUrl: PayloadAction<string>) => {
            state.currentEmployeePhoto = photoUrl.payload
        },
        deleteCurrentEmployee: (state) => {
            state.currentEmployeePhoto = null
            state.currentEmployee = null
        },
        resetCurrentEmployee: (state) => {
            state.currentEmployee = initialState.currentEmployee
            state.currentEmployeePhoto = initialState.currentEmployeePhoto
        }
    }
})

export const { setEmployeesState, setEmployeesPhotos, setResultCode, setCurrentEmployee, setCurrentEmployeePhoto, deleteCurrentEmployee, resetCurrentEmployee } = employeesSlice.actions

export const getEmployees = (page: number): AppThunk => (dispatch) => {
    employeesAPI.getEmployees(page)
        .then((data) => {
            if (data.data.resultCode === 0) {
                dispatch(setEmployeesState(data.data))
            } else {
                // catch error
            }
        })
}

export const searchEmployeesThunk = (page: number, substr: string): AppThunk => (dispatch) => {
    employeesAPI.searchEmployees(page, substr)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setEmployeesState(data.data))
        } else {
            // 
        }
    })
}

export const getEmployeesPhotos = (ids: number[]): AppThunk => async (dispatch) => {
    try {
        const photosPromises = ids.map(async (id) => {
            try {
                const response = await employeesAPI.getEmployeePhoto(id)
                return URL.createObjectURL(response.data)
            } catch (error) {
                console.error(`Ошибка загрузки фото для сотрудника ${id}:`, error);
                return ''
            }
        });

        const photosUrls = await Promise.all(photosPromises);
        dispatch(setEmployeesPhotos(photosUrls));
    } catch (error) {
        console.error('Ошибка в getEmployeesPhotos: ', error);
    }
};

export const getEmployeeThunk = (id: number): AppThunk => (dispatch) => {
    employeesAPI.getEmployee(id)
    .then((data) => {
        if (data.data.resultCode === 0) {
            dispatch(setCurrentEmployee(data.data))
        } else {
            // 
        }
    })
}

export const getEmployeePhotoThunk = (id: number): AppThunk => (dispatch) => {
    employeesAPI.getEmployeePhoto(id)
    .then((data) => {
        dispatch(setCurrentEmployeePhoto(URL.createObjectURL(data.data)))
    })
}

export const postEmployeeThunk = (name: string, info: string, isAccess: boolean, formData: FormData): AppThunk => (dispatch) => {
    employeesAPI.postEmployee(name, info, isAccess)
    .then((data) => {
        if (data.data.resultCode === 100) {
            employeesAPI.postEmployeePhoto(data.data.id, formData)
            .then((data) => {
                dispatch(setResultCode(data.data.resultCode))
            })
        } else {
            dispatch(setResultCode(data.data.resultCode))
        }
    })
}

export const postEmployeePhotoThunk = (id: number, formData: FormData): AppThunk => (dispatch) => {
    employeesAPI.postEmployeePhoto(id, formData)
    .then((data) => {
        // ошибки авторизации
        dispatch(setResultCode(data.data.resultCode))
    })
}

export const deleteEmployeeThunk = (id: number): AppThunk => (dispatch) => {
    employeesAPI.deleteEmployee(id)
    .then((data) => {
        if (data.data.resultCode === 101) {
            dispatch(deleteCurrentEmployee())
        } else {
            // 
        }
    })
}

export const updateEmployeeDataThunk = (id: number, name: string, info: string, isAccess: boolean): AppThunk => (dispatch) => {
    employeesAPI.updateEmployeeData(id, name, info, isAccess)
    .then((data) => {
        dispatch(setResultCode(data.data.resultCode))    
        if (data.data.resultCode === 102) {
            dispatch(setCurrentEmployee({id, name, info, isAccess}))
        }   
    })
}



export default employeesSlice
