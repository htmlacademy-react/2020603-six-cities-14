import Layout from './components/layout/layout';
import PrivateRoute from './components/private-route/private-route';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import MainPage from './pages/main-page/main-page';
import LoginPage from './pages/login-page/login-page';
import FavoritePage from './pages/favorite-page/favorite-page';
import OfferPage from './pages/offer-page/offer-page';
import Error from './pages/error/error';
import NotFound from './pages/404-page/404-page';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from './hooks';
import { getErrorStatus } from './store/offer-data/offer-data-selectors';
import { checkAuthAction } from './store/api-actions';
import { AppRoute } from './const';

export function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(getErrorStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (hasError) {
    return (
      <Error />);
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={'/'} element={<Layout />} >
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute.Favorite} element={
              <PrivateRoute redirectTo={AppRoute.Login} >
                <FavoritePage />
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer}>
              <Route index element={<OfferPage />} />
              <Route path={':offerId'} element={<OfferPage />} />
            </Route>
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Route>
          <Route path={AppRoute.Login} element={<LoginPage />} />
        </Routes>
      </BrowserRouter >
    </HelmetProvider >
  );
}
