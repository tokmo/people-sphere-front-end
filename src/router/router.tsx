import { createBrowserRouter } from 'react-router-dom';
import { Add, Home, NotFound } from '@/pages';
import { Update } from '@/pages/Update';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/add',
    element: <Add />,
  },
  {
    path: '/edit/:id',
    element: <Update />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
