import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Header />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Page 404</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Page 404: Not found</b>
              <br />
              <Link to="/">Go back to the main page</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
