import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import KakaoConfirm from './routes/KakaoConfirm';
import RecordsHome from './routes/RecordsHome';
import RecordsDetail from './routes/RecordsDetail';
import RecordsRegularGame from './routes/RecordsRegularGame';
import RecordsMe from './routes/RecordsMe';
import MyPage from './routes/MyPage';
import NewRegularGame from './routes/NewRegularGame';
import EditRegularGame from './routes/EditRegularGame';

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
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'social',
        children: [{ path: 'kakao', element: <KakaoConfirm /> }],
      },
      {
        path: 'records',
        element: <RecordsHome />,
      },
      {
        path: 'records/regular-games/new',
        element: <NewRegularGame />,
      },
      {
        path: 'records/regular-games/edit',
        element: <RecordsRegularGame />,
        children: [{ path: ':datePk', element: <EditRegularGame /> }],
      },
      {
        path: 'records/regular-games',
        element: <RecordsRegularGame />,
        children: [{ path: ':datePk', element: <RecordsDetail /> }],
      },
      {
        path: 'records/me',
        element: <RecordsMe />,
      },
    ],
  },
]);

export default router;
