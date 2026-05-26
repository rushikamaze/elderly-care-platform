import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const location = useLocation();

  let user = null;
  const token = localStorage.getItem("token");

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
}

export default ProtectedRoute;
