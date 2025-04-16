import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/loader/Loader';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
