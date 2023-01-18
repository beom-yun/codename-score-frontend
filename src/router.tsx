import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import NewRegularGame from './routes/NewRegularGame';
import NotFound from './routes/NotFound';
import RegularGame from './routes/RegularGame';

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
        path: 'regular-game/',
        element: <RegularGame />,
      },
      {
        path: 'regular-game/new/',
        element: <NewRegularGame />,
      },
    ],
  },
]);

export default router;
