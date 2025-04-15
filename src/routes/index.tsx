import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const PrivacyPolicyPage = lazy(
  () => import('../pages/privacyPolicy/PrivacyPolicy')
);
const UserTermsPage = lazy(() => import('../pages/userTerms/UserTerms'));
const Page404 = lazy(() => import('../pages/page404/Page404'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
  { path: '/user-terms', element: <UserTermsPage /> },
  { path: '*', element: <Page404 /> },
];
