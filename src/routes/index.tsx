import { lazy } from "react";
import RoleChecker from "../components/RoleChecker";
import { RouteT } from "../types/interface";
import { UserRole } from "../types/enum";
import { MainLayout } from "../pages/admin/layout/admin-layout";
import { Students } from "../pages/students";
import Dashboard from "../pages/admin/dashboard";
import { AddStudentForm } from "../pages/students-new";
import { UpdateStudentForm } from "../pages/students-update";
import { StudentDetail } from "../pages/student-detail";
import { Teacher } from "../pages/teachers";
import { TeacherDetail } from "../pages/teacher-detail";
import { AddTeacherForm } from "../pages/teacher-new";
import { UpdateTeacherForm } from "../pages/teacher-update";

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
                    {
                        path: "students/add",
                        element: <AddStudentForm />,
                    },
                    {
                        path: "student-detail/:id",
                        element: <StudentDetail />,
                    },
                    {
                        path: "students/:id",
                        element: <UpdateStudentForm />,
                    },
                    {
                        path: "teachers",
                        element: <Teacher />,
                    },
                    {
                        path: "teacher/add",
                        element: <AddTeacherForm />,
                    },
                    {
                        path: "teacher-detail/:id",
                        element: <TeacherDetail />,
                    },
                    {
                        path: "teacher/:id",
                        element: <UpdateTeacherForm />,
                    },
                    {
                        path: "groups",
                        element: <p>group</p>,
                    },
                    {
                        path: "groups/add",
                        element: <p>group create</p>,
                    },
                    {
                        path: "group-detail/:id",
                        element: <p>group detail</p>,
                    },
                    {
                        path: "groups/:id",
                        element: <p>group one</p>,
                    },
                    {
                        path: "courses",
                        element: <p>courses</p>,
                    },
                    {
                        path: "courses/add",
                        element: <p>courses create</p>,
                    },
                    {
                        path: "course-detail/:id",
                        element: <p>courses detail</p>,
                    },
                    {
                        path: "course/:id",
                        element: <p>courses one</p>,
                    },
                    {
                        path: "settings",
                        element: <div>Settings</div>,
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
