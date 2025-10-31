// ProtectedRoutes.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// 🧱 Protects all authenticated users (students, instructors)
export const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

  // Superadmin should not see student pages
  if (user?.role === "superadmin") return <Navigate to="/superadmin-dashboard" />;

  return children;
};

// 🚪 Prevents logged-in users from accessing login/signup page
export const AuthenticatedUser = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (isAuthenticated) {
    // Superadmin always goes to dashboard
    if (user?.role === "superadmin") return <Navigate to="/superadmin-dashboard" />;
    return <Navigate to="/" />;
  }

  return children;
};

// 🧑‍🏫 Admin route (instructor + superadmin)
export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (user?.role === "instructor" || user?.role === "superadmin") return children;

  return <Navigate to="/" />;
};

// 👑 Superadmin-only route
export const SuperAdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (user?.role !== "superadmin") return <Navigate to="/" />;

  return children;
};
