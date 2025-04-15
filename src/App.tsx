import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
