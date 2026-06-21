import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
  if (role === "DOCTOR") {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

  return <>{children}</>;
}
