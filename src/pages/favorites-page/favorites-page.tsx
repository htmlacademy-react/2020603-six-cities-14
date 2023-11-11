import { Helmet } from 'react-helmet-async';
import { Offer } from '../../types';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import OfferCard from '../../components/offer-card/offer-card';

type FavoritesPageProps = {
  favoritesOffers: Offer[];
}

function FavoritesPage({favoritesOffers}: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 городов - избранное</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoritesOffers.map((offer) => <OfferCard key={offer.id} offer={offer} cardType="favorite" />)}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoritesOffers.map((offer) => <OfferCard key={offer.id} offer={offer} cardType="favorite" />)}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
