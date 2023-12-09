import CardList from '../../components/card-list/card-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Footer from '../../components/footer/footer';
import { FavoritesByCity } from '../../types/favorites-by-city';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { Loader } from '../../components/loader/loader';
import { getFavLoadingStatus, getFavs} from '../../store/offer-data/offer-data-selectors';
import { LoadingDataStatus } from '../../const';

export default function FavoritePage(): JSX.Element {
  const favLoadingStatus = useAppSelector(getFavLoadingStatus);
  const favoriteOffers = useAppSelector(getFavs);

  function getFavoriteCities(favOffers: Array<Offer>): FavoritesByCity {

    const result = favOffers.reduce<FavoritesByCity>((acc, value) => {
      const city = value.city.name;
      if (!(city in acc)) {
        acc[city] = [];
      }
      acc[city].push(value);
      return acc;
    }, {});
    return result;
  }

  const favoritesByCity = getFavoriteCities(favoriteOffers);

  return (
    <>
      {!favoriteOffers.length && <FavoritesEmpty />}

      {favLoadingStatus === LoadingDataStatus.Pending && <Loader />}

      {
        favLoadingStatus === LoadingDataStatus.Success &&
        <div className='page'>
          <Helmet>
            <title>Favorites</title>
          </Helmet>
          <main className="page page__main page__main--favorites">
            <div className="page__favorites-container container">
              {
                favoriteOffers.length > 0 &&
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {Object.entries(favoritesByCity).map(([city, favoriteList]) => (
                      < li key={city} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <CardList elementType='favorite' offers={favoriteList} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              }
            </div>
          </main >
          <Footer />
        </div >
      }
    </>
  );
}
