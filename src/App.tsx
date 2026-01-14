import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Companies } from '@/pages/Companies';
import { CompanyPage } from '@/pages/CompanyPage';
import { SubmitReview } from '@/pages/SubmitReview';
import { MyReviews } from '@/pages/MyReviews';
import { Profile } from '@/pages/Profile';
import { Resources } from '@/pages/Resources';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { Contact } from '@/pages/Contact';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout><Home /></Layout>,
    },
    {
      path: '/empresas',
      element: <Layout><Companies /></Layout>,
    },
    {
      path: '/empresa/:slug',
      element: <Layout><CompanyPage /></Layout>,
    },
    {
      path: '/avaliar',
      element: <Layout><SubmitReview /></Layout>,
    },
    {
      path: '/minhas-avaliacoes',
      element: <Layout><MyReviews /></Layout>,
    },
    {
      path: '/perfil',
      element: <Layout><Profile /></Layout>,
    },
    {
      path: '/recursos',
      element: <Layout><Resources /></Layout>,
    },
    {
      path: '/termos',
      element: <Layout><Terms /></Layout>,
    },
    {
      path: '/privacidade',
      element: <Layout><Privacy /></Layout>,
    },
    {
      path: '/contacto',
      element: <Layout><Contact /></Layout>,
    },
    {
      path: '*',
      element: <Layout><Home /></Layout>,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  );
}

export default App;
