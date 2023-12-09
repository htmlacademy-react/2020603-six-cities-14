import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';

export default function Error(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Failed to load offers</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="error__wrapper">
                <p className='error__text'><b>Failed to load offers</b></p>
                <button
                  onClick={() => {
                    dispatch(fetchOffersAction());
                  }}
                  className="error__button button"
                  type="button"
                >
                  Try again
                </button>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main >
    </div >
  );
}
