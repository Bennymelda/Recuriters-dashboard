import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import type { UserRole } from "./types/auth";
interface RoleProtectedRouteProps {
 allowedRoles: UserRole[];
}

const RoleProtectedRoute = ({
 allowedRoles,
}: RoleProtectedRouteProps) => {
 const user = useAuthStore((state) => state.user);

 // No authenticated user
 if (!user) {
 return <Navigate to="/login" replace />;
 }

 // User does not have permission
 if (!allowedRoles.includes(user.role)) {
 return <Navigate to="/dashboard" replace />;
 }

 return <Outlet />;
};

export default RoleProtectedRoute;