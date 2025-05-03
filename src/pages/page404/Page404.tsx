import { Link } from 'react-router-dom';

import SEO from '../../components/SEO';
import { seo404 } from '../../data/seoData';

import errorImg from '../../assets/img/error/error-404.svg';
import backHomeIcon from '@/assets/img/error/back-home.svg';

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
              <img src={backHomeIcon} alt="Arrow left" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
