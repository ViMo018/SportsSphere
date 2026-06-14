import { Navigate, useLocation } from "react-router-dom";

function getStoredUser() {
  const storedUser = localStorage.getItem("sportssphere_user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem("sportssphere_user");
    return null;
  }
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("sportssphere_token");
  const user = getStoredUser();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/sports/cricket" replace />;
  }

  return children;
}

export default AdminRoute;