import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'motion/react';
import { Suspense } from 'react';

import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/loader/Loader';

function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<Loader />}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;
