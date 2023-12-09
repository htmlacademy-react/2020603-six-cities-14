import CardList from '../card-list/card-list';
import Sort from '../sort/sort';
import Map from '../map/map';
import { useState } from 'react';
import { SortingOption } from '../../const';
import { ActiveCity } from '../../types/city';
import { Offer } from '../../types/offer';
import { SortType } from '../../types/sort';

type CitiesProps = {
  offersByCity: Array<Offer>;
  selectedCity: ActiveCity;
}

export default function Cities({ offersByCity, selectedCity }: CitiesProps): JSX.Element {

  const [hoveredOfferId, setHoveredOfferId] = useState<Offer['id'] | null>(null);
  const [sortItem, setSortItem] = useState<SortType>(SortingOption.Popular);

  const sortCallbacks: Record<SortType, (a: Offer, b: Offer) => number> = {
    [SortingOption.Popular]: () => 0,
    [SortingOption.PriceLowToHigh]: (a, b) => a.price - b.price,
    [SortingOption.PriceHighToLow]: (a, b) => b.price - a.price,
    [SortingOption.TopRatedFirst]: (a, b) => b.rating - a.rating,
  };
  const defaultSort = sortCallbacks[SortingOption.Popular];
  const sort = sortCallbacks[sortItem] ?? defaultSort;
  const sortedOffers = offersByCity.slice().sort(sort);

  function handleCardHover(offerId: Offer['id'] | null) {
    setHoveredOfferId(offerId);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {selectedCity}</b>
          <Sort cb={setSortItem} />
          <div className="cities__places-list places__list tabs__content">
            <CardList
              elementType={'cities'}
              offers={sortedOffers}
              onCardHover={handleCardHover}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            mapType={'cities'}
            offers={offersByCity}
            offerId={hoveredOfferId}
          />
        </div>
      </div>
    </div>
  );
}
