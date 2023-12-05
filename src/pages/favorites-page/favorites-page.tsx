import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Offer } from '../../types';
import { useAppDispatch } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import OfferCards from '../../components/offer-cards/offer-cards';
import { getFavorites } from '../../store/favotites-data/selectors';


function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesOffers = useSelector(getFavorites);

  const computedFavoriteOffers = useMemo(() => {
    const offers: {[key: string]: Offer[]} = {};
    favoritesOffers.forEach((offer: Offer) => {
      if (offers[offer.city.name] === undefined) {
        offers[offer.city.name] = [offer];
      } else {
        offers[offer.city.name] = [ ...offers[offer.city.name], offer];
      }
    });

    return offers;
  }, [favoritesOffers]);

  const updateFavorites = () => {
    dispatch(fetchFavoritesAction());
  };

  return (
    <div className="page">
      <Helmet>
        <title>6 городов - избранное</title>
      </Helmet>
      <Header />

      <main
        className={
          `page__main page__main--favorites
          ${favoritesOffers.length === 0 ? 'page__main--favorites-empty' : ''}`
        }
      >
        <div className="visually-hidden">Favorites offers</div>
        <div className="page__favorites-container container">
          {favoritesOffers.length > 0 &&
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(computedFavoriteOffers).map((city) =>
                  (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <OfferCards offers={computedFavoriteOffers[city]} cardType="favorite" handleFavoriteToggling={updateFavorites} />
                      </div>
                    </li>
                  ))}
              </ul>
            </section>}
          {favoritesOffers.length === 0 && (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
