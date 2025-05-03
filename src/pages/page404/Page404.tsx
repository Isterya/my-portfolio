import { Link } from 'react-router-dom';

import SEO from '../../components/SEO';
import { seo404 } from '../../data/seoData';

import errorImg from '../../assets/img/error/error-404.svg';

import './page404.scss';

const Page404 = () => {
  return (
    <>
      <SEO {...seo404} />

      <div className="page404">
        <div className="container">
          <div className="page404-wrapper">
            <h1 className="page404-header">Oops!</h1>
            <h2 className="page404-subheader">You are lost</h2>

            <img className="page404-img" src={errorImg} alt="Boy with a magnifying glass" />

            <Link to={'/'} className="page404-back">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 18L7 6"
                  stroke="currentColor"
                  stroke-width="1.00088"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 12L17 12"
                  stroke="currentColor"
                  stroke-width="1.00088"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 9C11.8284 10.1716 11.1716 10.8284 10 12L13 15"
                  stroke="currentColor"
                  stroke-width="1.00088"
                  stroke-linejoin="round"
                />
              </svg>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
