import { Link, useNavigate } from "react-router-dom";

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

function Navbar() {
  const navigate = useNavigate();
  const user = getStoredUser();

  function handleLogout() {
    localStorage.removeItem("sportssphere_token");
    localStorage.removeItem("sportssphere_user");

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