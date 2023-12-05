import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createApi } from '../../api/api';
import { Comment, Offer, Review } from '../../types';
import { ApiUrl } from '../../api/urls';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { addFavoritesAction, removeFavoritesAction } from '../../store/api-actions';
import { getRating, capitalizeFirstLetter } from '../../utils';
import { getAuthorizationStatus } from '../../store/autorization-status-data/selectors';
import Header from '../../components/header/header';
import CommentForm from '../../components/comment-form/comment-form';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import OfferCards from '../../components/offer-cards/offer-cards';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferFeatures from '../../components/offer-features/offer-features';
import OfferHost from '../../components/offer-host/offer-host';
import { ERROR_STATUS_CODE, ERROR_ROUTE, AuthStatus } from '../../const';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useParams()?.id;
  const [comments, setComments] = useState<Comment[]>([]);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [offersNearby, setOffersNearby] = useState<Offer[]>([]);
  const [isFormBlocked, setIsFormBlocked] = useState<boolean>(false);
  const [isOfferLoading, setIsOfferLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const api = createApi();

  const fetchComments = async() => {
    setIsOfferLoading(true);
    const { data } = await api.get<Comment[]>(`${ApiUrl.GetComments}/${id}`);
    setComments(data);
    setIsOfferLoading(false);
  };

  const fetchOffersNearby = async() => {
    setIsOfferLoading(true);
    const { data } = await api.get<Offer[]>(`${ApiUrl.GetOffers}/${id}/nearby`);
    setOffersNearby(data);
    setIsOfferLoading(false);
  };

  const fetchOffer = async() => {
    try {
      const res = await api.get<Offer>(`${ApiUrl.GetOffers}/${id}`);
      setOffer(res.data);
      fetchComments();
      fetchOffersNearby();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error?.response?.status === ERROR_STATUS_CODE) {
        navigate(ERROR_ROUTE);
      }
    }
  };

  useEffect(() => {
    fetchOffer();
    window.scrollTo(0, 0);
  }, [id]);

  const sendComment = async (comment: Review) => {
    setIsFormBlocked(true);
    try {
      await api.post<Comment[]>(`${ApiUrl.GetComments}/${id}`, comment)
        .then((data) => {
          setComments(data.data);
          setIsFormBlocked(false);
        });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorText: string = error?.message;
        if (errorText) {
          toast.error(errorText);
        }
      }
      setIsFormBlocked(false);
    }
  };

  const toggleFavorite = async (favoriteOffer: Offer) => {
    if (authorizationStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const { isFavorite } = favoriteOffer;
    if (isFavorite) {
      await dispatch(removeFavoritesAction(favoriteOffer));
    } else {
      await dispatch(addFavoritesAction(favoriteOffer));
    }
    fetchOffer();
  };

  return (
    <div className="page">
      <Helmet>
        <title>6 городов - страница отеля</title>
      </Helmet>
      <Header />

      <div className="visually-hidden">Offer info</div>

      {offer &&
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery picsUrls={offer.images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={ () => {
                    toggleFavorite(offer);
                  }}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: getRating(offer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(offer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} {offer.maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferFeatures features={offer.goods} />
              <div className="offer__host">
                <OfferHost host={offer.host} />
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {
                  comments.length > 0 &&
                  <h2 className="reviews__title">{comments.length > 1 ? 'Reviews' : 'Review'} &middot;
                    <span className="reviews__amount"> {comments.length}</span>
                  </h2>
                }
                {comments.length > 0 && <CommentsList comments={comments} />}
                {authorizationStatus === AuthStatus.Auth &&
                  <CommentForm isBlocked={isFormBlocked} sendComment={sendComment} />}
              </section>
            </div>
          </div>
          {offer && !isOfferLoading && <Map offers={[...offersNearby, offer]} activeOffer={offer} type="offer" isActiveOfferOrange isOfferPage />}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {offersNearby && <OfferCards offers={offersNearby} cardType="near-places" handleFavoriteToggling={fetchOffer}/> }
          </section>
        </div>
      </main>}
    </div>
  );
}

export default OfferPage;
