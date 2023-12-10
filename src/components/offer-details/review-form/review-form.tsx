import { FormEvent, ChangeEvent, Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingDataStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setError } from '../../../store/app-process/app-process-slice';
import { clearErrorAction, postCommentAction } from '../../../store/api-actions';
import { getReviewStatusSending } from '../../../store/offer-data/offer-data-selectors';
import { CommentLength } from '../../../const';
import { Assessment } from '../../../const';

export default function ReviewForm(): JSX.Element {
  const ratingMap = {
    [Assessment.Perfect]: '5',
    [Assessment.Good]: '4',
    [Assessment.NotBad]: '3',
    [Assessment.Badly]: '2',
    [Assessment.Terribly]: '1'
  };

  const dispatch = useAppDispatch();
  const { offerId } = useParams();
  const [rating, setRating] = useState('0');
  const [comment, setComment] = useState('');
  const sendingStatus = useAppSelector(getReviewStatusSending);
  const isSending = sendingStatus === LoadingDataStatus.Pending;
  const sendData = {
    reviewData: { comment, rating: Number(rating) },
    offerId,
  };
  const isCommentNotValid = (comment.length <= CommentLength.Min) || (comment.length >= CommentLength.Max);
  const isRatingNotValid = Boolean(Number(rating)) === false;
  const isDisabledSubmit = isCommentNotValid || isRatingNotValid || isSending;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setRating(event.target.value);
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(postCommentAction(sendData));
  }

  useEffect(() => {
    switch (sendingStatus) {
      case LoadingDataStatus.Success:
        setComment('');
        setRating('');
        break;
      case LoadingDataStatus.Error:
        dispatch(setError('Отзыв не отправлен, попробуйте снова'));
        dispatch(clearErrorAction());
    }

  }, [sendingStatus, dispatch]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Object.entries(ratingMap).map(([title, score]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={rating === score}
                disabled={isSending}
                onChange={handleInputChange}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        minLength={CommentLength.Min}
        maxLength={CommentLength.Max}
        disabled={isSending}
        onChange={handleTextAreaChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentLength.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabledSubmit}
        >
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
