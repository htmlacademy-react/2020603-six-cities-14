import MainEmpty from '../../components/main-empty/main-empty';
import Cities from '../../components/cities/cities';
import Filter from '../../components/filter/filter';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Loader } from '../../components/loader/loader';
import { getIsOffersLoading, getOffers } from '../../store/offer-data/offer-data-selectors';
import { getAuthStatus } from '../../store/users-process/user-process-selectors';
import { getActiveCity } from '../../store/app-process/app-process-selectors';
import { fetchOffersAction } from '../../store/api-actions';
import { AuthStatus } from '../../const';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const isLoading = useAppSelector(getIsOffersLoading);
  const authStatus = useAppSelector(getAuthStatus);
  const filterValue = useAppSelector(getActiveCity);
  const offersByCity = offers.filter((offer) => offer.city.name === filterValue);
  const offersLength = offersByCity.length;

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <>
      {(isLoading || authStatus === AuthStatus.Unknown) && <Loader />}

      {!isLoading &&
        <div className="page page--gray page--main">
          <main className={`${offersLength === 0 ? 'page__main--index-empty' : ''} page__main page__main--index`}>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <Filter />
              </section>
            </div>
            {!offersLength && <MainEmpty />}
            {
              offersLength &&
              <Cities offersByCity={offersByCity} selectedCity={filterValue} />
            }
          </main>
        </div>}
    </>
  );
}
