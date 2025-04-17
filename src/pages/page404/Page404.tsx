import { Link } from 'react-router-dom';

import errorImg from '../../assets/img/404-error.svg';

import './page404.scss';

const Page404 = () => {
  return (
    <div className="page404">
      <div className="container">
        <div className="page404__bg page404__bg--top"></div>
        <div className="page404__bg page404__bg--bottom"></div>

        <div className="page404__content">
          <div className="page404__text">
            <h1>Oops! Looks like this page doesn't exist.</h1>
            <Link
              to="/"
              aria-label="Return to home page"
            >
              BACK TO HOME
            </Link>
          </div>

          <img
            className="page404__content-img"
            src={errorImg}
            alt="404 error img"
          />
        </div>
      </div>
    </div>
  );
};

export default Page404;
