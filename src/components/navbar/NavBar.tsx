import logo from '../../assets/icons/logo.svg';

import './navBar.scss';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list navbar-list--left">
        <li className="navbar-list__item">
          <a href="#">Home</a>
        </li>
        <li className="navbar-list__item">
          <a href="#">Skills</a>
        </li>
        <li className="navbar-list__item">
          <a href="#">Experience</a>
        </li>
      </ul>

      <div className="navbar-logo">
        <a href="#">
          <img
            src={logo}
            alt="Logotype"
          />
        </a>
      </div>

      <ul className="navbar-list navbar-list--right">
        <li className="navbar-list__item">
          <a href="#">Portfolio</a>
        </li>
        <li className="navbar-list__item">
          <a href="#">Price</a>
        </li>
        <li className="navbar-list__item">
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
