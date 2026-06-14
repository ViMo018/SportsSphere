import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/sports/cricket" className="navbar-brand">
        <span className="navbar-logo">SS</span>
        <span>SportsSphere</span>
      </Link>

      <div className="navbar-links">
        <Link to="/sports/cricket">Sports</Link>

        {user && <Link to="/my-bookings">My Bookings</Link>}

        {isAdmin && <Link to="/admin">Admin</Link>}

        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>

            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="navbar-cta">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;