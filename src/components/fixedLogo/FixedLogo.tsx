import { Link } from 'react-router-dom';

import logo from '../../assets/icons/full-logo.svg';

import './fixedLogo.scss';

const FixedLogo = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <div>
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
