import { lazy } from "react";
import RoleChecker from "../components/RoleChecker";
import { RouteT } from "../types/interface";
import { UserRole } from "../types/enum";
import { MainLayout } from "../pages/admin/admin-layout";

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
                index: true,
                element: <MainLayout />,
            },
        ],
    },
    {
        path: "/teacher",
        element: <RoleChecker roles={[UserRole.TEACHER]} />,
        children: [
            {
                index: true,
                element: <MainLayout />,
            },
        ],
    },
];
