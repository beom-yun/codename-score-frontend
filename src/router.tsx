import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import RegularGameDetail from './routes/RegularGameDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'scores/:regularGamePk',
        element: <RegularGameDetail />,
      },
    ],
  },
]);

export default router;
