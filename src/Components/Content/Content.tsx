import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import s from './Content.module.css'
import AccessLog from './AccessLog/AccessLog';
import Employees from './Employees/Employees';
import UsersContainer from './Users/UsersContainer';
import { ProtectedRoute } from '../Containers/ProtectedRoute';
import CurrentUser from './Users/CurrentUser/CurrentUser';

const Content = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            Component: AccessLog,
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
                    <Employees />
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
            <RouterProvider router={router} />
        </div>
    )
}

export default Content