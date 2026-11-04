import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import PageLayout from '@/layouts/PageLayout';
// The home page is the entry point of almost every visit: bundle it with the app shell to avoid an
// extra request round trip and a loader flash. Secondary pages stay lazy.
import HomePage from '@/pages/HomePage';

const PrivacyPolicyPage = lazy(() => import('@/pages/privacyPolicyPage/PrivacyPolicyPage'));
const UserTermsPage = lazy(() => import('@/pages/userTermsPage/UserTermsPage'));
const Page404 = lazy(() => import('@/pages/page404/Page404'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PageLayout>
        <HomePage />
      </PageLayout>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <PageLayout simplified>
        <PrivacyPolicyPage />
      </PageLayout>
    ),
  },
  {
    path: '/user-terms',
    element: (
      <PageLayout simplified>
        <UserTermsPage />
      </PageLayout>
    ),
  },
  { path: '*', element: <Page404 /> },
];
