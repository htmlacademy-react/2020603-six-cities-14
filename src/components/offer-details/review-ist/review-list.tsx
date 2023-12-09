import Review from '../review/review';
import { useAppSelector } from '../../../hooks';
import { convertDateInMs } from '../../../utils';
import { getReviews } from '../../../store/offer-data/offer-data-selectors';
import { MAX_REVIEWS_COUNT } from '../../../const';

export default function ReviewList(): JSX.Element {
  const reviewServer = useAppSelector(getReviews);
  const reviewServerCopy = structuredClone(reviewServer)
    .sort((a, b) => convertDateInMs(b.date) - convertDateInMs(a.date))
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewServer.length}</span></h2>
      <ul className="reviews__list">
        {reviewServerCopy.map((review) => (
          <Review
            key={review.id}
            review={review}
          />
        ))}
      </ul>
    </>
  );
}
