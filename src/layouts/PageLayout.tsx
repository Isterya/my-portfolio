import { ReactNode } from 'react';

import FixedLogo from '../components/fixedLogo/FixedLogo';
import Footer from '../components/footer/Footer';

type PageLayoutProps = {
  children: ReactNode;
  simplified?: boolean;
};

const PageLayout = ({ children, simplified }: PageLayoutProps) => {
  const isSimplified = simplified ?? false;

  return (
    <>
      <FixedLogo visible={isSimplified} />
      <main>{children}</main>
      <Footer simplified={isSimplified} />
    </>
  );
};

export default PageLayout;
