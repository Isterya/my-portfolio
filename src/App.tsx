import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, MotionConfig } from 'motion/react';
import { Suspense } from 'react';

import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/loader/Loader';

const loadMotionFeatures = () => import('./utils/motionFeatures').then((module) => module.default);

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <AppRoutes />
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
