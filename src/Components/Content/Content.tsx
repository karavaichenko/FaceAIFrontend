import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import s from './Content.module.css'
import AccessLog from './AccessLog/AccessLog';
import UsersContainer from './Users/UsersContainer';
import { ProtectedRoute } from '../Containers/ProtectedRoute';
import CurrentUser from './Users/CurrentUser/CurrentUser';
import EmployeesConatiner from './Employees/EmployeesContainer';
import CurrentEmployee from './Employees/CurrentEmployee/CurrentEmployee';
import CurrentAccessLog from './AccessLog/CurrentAccessLog/CurrentAccessLog';
import AccessLogsNotify from '../Notifications/AccessLogsNotify';
import { BASE_WS_URL } from '../../Api/api';

const Content = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <AccessLog />
            ),
        },
        {
            path: "/access",
            element: (
                <CurrentAccessLog />
            )
        },
        {
            path: "/users",
            element: (
                <ProtectedRoute requiredAccessLevel={0}>
                    <UsersContainer />
                </ProtectedRoute>
            )
        },
        {
            path: "/employees",
            element: (
                <ProtectedRoute requiredAccessLevel={0}>
                    <EmployeesConatiner />
                </ProtectedRoute>
            )
        },
        {
            path: "/employee",
            element: (
                <ProtectedRoute requiredAccessLevel={0}>
                    <CurrentEmployee />
                </ProtectedRoute>
            )
        },
        {
            path: "/user",
            element: (
                <ProtectedRoute requiredAccessLevel={0}>
                    <CurrentUser />
                </ProtectedRoute>
            )
        }
    ]);



    return (
        <div className={s.container}>
            <AccessLogsNotify url={BASE_WS_URL + '/ws'}/>
            <RouterProvider router={router} />
        </div>
    )
}

export default Content