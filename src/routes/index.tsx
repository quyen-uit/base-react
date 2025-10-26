import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainLayout, AdminLayout } from '@/layouts';
import { ProtectedRoute } from '@/components';
import { ROUTES } from '@/constants';
import { LoadingSpinner } from '@/components';

const HomePage = lazy(() => import('@/features/home').then((m) => ({ default: m.HomePage })));
const LoginPage = lazy(() => import('@/features/auth').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/features/auth').then((m) => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('@/features/dashboard').then((m) => ({ default: m.DashboardPage })));
const ProductsPage = lazy(() => import('@/features/products').then((m) => ({ default: m.ProductsPage })));
const ProfilePage = lazy(() => import('@/features/profile').then((m) => ({ default: m.ProfilePage })));
const GalleryPage = lazy(() => import('@/features/examples/gallery').then((m) => ({ default: m.GalleryPage })));
const TeamPage = lazy(() => import('@/features/examples/team').then((m) => ({ default: m.TeamPage })));
const ServicesPage = lazy(() => import('@/features/examples/services').then((m) => ({ default: m.ServicesPage })));
const MrtTablePage = lazy(() => import('@/features/examples/table').then((m) => ({ default: m.MrtTablePage })));
const AdminDashboardPage = lazy(() => import('@/features/admin').then((m) => ({ default: m.AdminDashboardPage })));
const AnalyticsPage = lazy(() => import('@/features/analytics').then((m) => ({ default: m.AnalyticsPage })));
const UsersPage = lazy(() => import('@/features/users').then((m) => ({ default: m.UsersPage })));
const ColorPage = lazy(() => import('@/features/colors/ColorPage'));
const SettingsPage = lazy(() => import('@/features/settings').then((m) => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import('@/features/notfound').then((m) => ({ default: m.NotFoundPage })));

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'colors',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ColorPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ProductsPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'examples/gallery',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GalleryPage />
          </Suspense>
        ),
      },
      {
        path: 'examples/team',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TeamPage />
          </Suspense>
        ),
      },
      {
        path: 'examples/services',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: 'examples/table',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MrtTablePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.ADMIN,
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: 'colors',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ColorPage />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UsersPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
