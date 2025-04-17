import { Link } from 'react-router-dom';

import logo from '../../assets/icons/fixed-logo.svg';

import './fixedLogo.scss';

const FixedLogo = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <div className="fixed-logo">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default FixedLogo;
