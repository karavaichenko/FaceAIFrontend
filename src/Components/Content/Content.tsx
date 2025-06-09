import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import s from './Content.module.css'
import AccessLog from './AccessLog/AccessLog';
import Users from './Users/Users';
import Employees from './Employees/Employees';

const Content = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            Component: AccessLog,
        },
        {
            path: "/users",
            Component: Users
        },
        {
            path: "/employees",
            Component: Employees
        }
    ]);



    return (
        <div className={s.container}>
            {/* <Menu /> */}
            <RouterProvider router={router} />
        </div>
    )
}

export default Content