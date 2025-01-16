import { Link } from "react-router";
import { logOut } from "../../utilities/users-services";
import "./nav.css";

function Nav(user) {
  function handleLogOut() {
    //delegate this functionality to users-services
    logOut();
    //Update state will also cause a rerender
    setUser(null);
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

            <li className="nav__item">
              <Link className="nav__link" to="/cart">
                Cart
              </Link>
            </li>

            <li className="nav__item">
              <Link className="nav__link" to="" onClick={handleLogOut}>
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
