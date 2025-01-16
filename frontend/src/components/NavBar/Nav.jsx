import { Link } from "react-router";
import { useNavigate } from "react-router";
import { logOut } from "../../utilities/users-services";
import "./nav.css";

function Nav({ user, setUser }) {
  const navigate = useNavigate(); // Initialize the navigate function

  function handleLogOut() {
    logOut(); // Log the user out
    setUser(null); // Clear the user state
    navigate("/"); // Redirect to home page after logout
  }

  return (
    <header className="header">
      <nav className="nav container">
        <Link className="nav__link" to="/">
          @Maya Cake Shop
        </Link>
        <div>
          <ul className="nav__list grid">
            <li className="nav__item">
              <Link className="nav__link" to="/">
                <i className="uil uil-estate nav__icon"></i>
                Home
              </Link>
            </li>

            <li className="nav__item">
              <Link className="nav__link" to="/menu">
                Menu
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav__item">
                  <Link className="nav__link" to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav__item">
                  <Link className="nav__link" to="/" onClick={handleLogOut}>
                    LogOut
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav__item">
                <Link className="nav__link" to="/authentication">
                  SignIn
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
