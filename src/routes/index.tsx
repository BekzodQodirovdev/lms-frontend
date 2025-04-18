import { lazy } from "react";
import RoleChecker from "../components/RoleChecker";
import { RouteT } from "../types/interface";
import { UserRole } from "../types/enum";
import { MainLayout } from "../pages/admin/layout/admin-layout";
import { Students } from "../pages/students";
import Dashboard from "../pages/admin/dashboard";

const Login = lazy(() => import("../pages/auth/login"));
// const Dashboard = lazy(() => import("../pages/dashboard"));
export const routes: RouteT[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/admin",
        element: <RoleChecker roles={[UserRole.ADMIN]} />,
        children: [
            {
                path: "",
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: "students",
                        element: <Students />,
                    },
                ],
            },
        ],
    },
    {
        path: "/teacher",
        element: <RoleChecker roles={[UserRole.TEACHER]} />,
        children: [
            {
                path: "",
                element: <MainLayout />,
            },
        ],
    },
];
