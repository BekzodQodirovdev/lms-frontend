import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { CookiesEnum, UserRole } from "../types/enum";
import { GetCookie } from "../config/cookie";

const RoleChecker = ({ roles }: { roles: string[] }) => {
    const { user, token, logOut } = useAuthStore();

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    const checkTokenExpiration = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const exp = payload.exp * 1000;
            return Date.now() >= exp;
        } catch (error) {
            console.error("Tokenni tahlil qilishda xatolik:", error);
            return true;
        }
    };
    const refreshToken = GetCookie(CookiesEnum.ACCESS_TOKEN);
    const expire = checkTokenExpiration(refreshToken);

    if (expire) {
        logOut();
        return <Navigate to="/login" replace />;
    }

    if (!roles.includes(user.role ?? "")) {
        if (UserRole.ADMIN === user.role) {
            return <Navigate to="/admin" replace />;
        } else if (UserRole.TEACHER === user.role) {
            return <Navigate to="/teacher" replace />;
        }
    }

    return <Outlet />;
};

export default RoleChecker;
