import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import Offer from '../../pages/offer/offer';

export type AppProps = {
  placesCount: number;
}

export default function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main {...props} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path='/favorites'
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer}>
          <Route index element={<Offer />} />
          <Route path={AppRoute.OfferId} element={<Offer />} />
        </Route>
        <Route path={AppRoute.Error} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // <Main {...props} />
  );
}

// export default function App({ placesCount }: AppProps): JSX.Element {
//   return (
//     <Main placesCount={placesCount} />
//   );
// }
