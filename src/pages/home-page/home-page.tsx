import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Offer } from '../../types';
import { cities, SortingOption, CityName } from '../../const';
import { getOffers, getOffersDataLoadingStatus } from '../../store/offers-data/selectors';
import { getCity } from '../../store/city-data/selectors';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Sorting from '../../components/sorting/sorting';
import OfferCards from '../../components/offer-cards/offer-cards';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';

function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers = useSelector(getOffers);
  const offersDataLoadingStatus = useSelector(getOffersDataLoadingStatus);
  const activeCity = useSelector(getCity);
  const offersContainer = useRef<HTMLDivElement | null>(null);

  const filterOffers = (city: CityName) => offers.filter((offer: Offer) => offer.city.name === city);

  const [activeOffer, setActiveOffer] = useState<Offer>(filterOffers(cities[0])[0]);
  const [hoveredOffer, setHoveredOffer] = useState<Offer | null>(null);
  const [activeOption, setActiveOption] = useState<string>(SortingOption.Popular);

  const updateSorting = (option: string) => {
    setActiveOption(option);
  };

  const sortOffers = (filteredOffers: Offer[]) => {
    switch (activeOption) {
      case SortingOption.Popular:
        return filterOffers(activeCity);
      case SortingOption.PriceLowToHigh:
        return filteredOffers.sort((a: Offer, b: Offer) => a.price - b.price);
      case SortingOption.PriceHighToLow:
        return filteredOffers.sort((a: Offer, b: Offer) => b.price - a.price);
      case SortingOption.TopRatedFirst:
        return filteredOffers.sort((a: Offer, b: Offer) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  };

  const filteredAndSortedOffers = useMemo(() => {
    if (!offers.length) {
      return [];
    }

    setActiveOffer(filterOffers(activeCity)[0]);

    const filteredOffers = filterOffers(activeCity);
    const sortedOffers = sortOffers(filteredOffers);

    return sortedOffers;
  }, [offers, activeCity, activeOption]);


  const updateActiveOffer = (value: Offer) => {
    setActiveOffer(value);
    setHoveredOffer(value);
  };

  const clearHoveredOffer = () => setHoveredOffer(null);

  const updateOffers = () => {
    dispatch(fetchOffersAction());
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 городов</title>
      </Helmet>
      <Header />

      {offersDataLoadingStatus === false &&
        <main className={`page__main page__main--index ${!offers.length ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesTabs />
          <div className="cities">
            {filteredAndSortedOffers.length > 0 &&
              <div className="cities__places-container container">
                <section ref={offersContainer} className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {filteredAndSortedOffers.length} places to stay in {activeCity}
                  </b>
                  <Sorting handleSorting={updateSorting} />
                  <OfferCards
                    offers={filteredAndSortedOffers}
                    cardType="city"
                    handleActiveOffer={updateActiveOffer}
                    removeHoveredOffer={clearHoveredOffer}
                    handleFavoriteToggling={updateOffers}
                  />
                </section>
                <div className="cities__right-section">
                  <Map offers={filteredAndSortedOffers} activeOffer={activeOffer} hoveredOffer={hoveredOffer} type="city" isActiveOfferOrange />
                </div>
              </div>}

            {filteredAndSortedOffers.length === 0 &&
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>}
          </div>
        </main>}

      {offersDataLoadingStatus === true && <Spinner></Spinner>}
    </div>
  );
}

export default HomePage;
