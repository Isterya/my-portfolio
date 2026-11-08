import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/icons/fixed-logo.svg';

import './fixedLogo.scss';

const FixedLogo = ({ visible }: { visible: boolean }) => {
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <header className="fixed-logo">
      <Link to="/">
        <img src={logo} alt={t('a11y.home')} />
      </Link>
    </header>
  );
};

export default FixedLogo;
