import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function ErrorPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 sities - Error Page</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page 404</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Page not found</b>
              <br />
              <Link to={AppRoute.Main}>Go back to the main page</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
