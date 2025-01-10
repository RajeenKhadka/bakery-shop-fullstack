import { Link } from "react-router";
import "./nav.css";

function Nav() {
  return (
    <header className="header">
      <nav className="nav container">
        <a href="index.html" className="nav__logo">
          @Maya Cake Shop
        </a>
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
              <Link className="nav__link" to="/order">
                Order
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
