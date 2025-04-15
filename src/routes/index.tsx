import { RouteObject } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import PrivacyPolicy from '../pages/privacyPolicy/PrivacyPolicy';
import UserTerms from '../pages/userTerms/UserTerms';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/user-terms',
    element: <UserTerms />,
  },
  { path: '*', element: <h1>404 — Not Found</h1> },
];
