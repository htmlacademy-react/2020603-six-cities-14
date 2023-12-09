import { ReviewType } from '../../types/review';
import { State } from '../../types/state';
import { Favorite, Offer, SelectedOffer } from '../../types/offer';
import { LoadingDataStatus, NameSpace } from '../../const';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getSelectedOffer = (state: State): SelectedOffer | null => state[NameSpace.Data].selectedOffer;
export const getFavs = (state: State): Favorite[] => state[NameSpace.Data].favs;
export const getNearPlaces = (state: State): Offer[] => state[NameSpace.Data].nearPlaces;
export const getReviews = (state: State): ReviewType[] => state[NameSpace.Data].reviews;

export const getReviewStatusSending = (state: State): LoadingDataStatus => state[NameSpace.Data].reviewStatusSending;
export const getIsOffersLoading = (state: State): boolean => state[NameSpace.Data].isOffersLoading;
export const getFavLoadingStatus = (state: State): LoadingDataStatus => state[NameSpace.Data].favsLoadingStatus;
export const getOfferDataStatusSending = (state: State): LoadingDataStatus => state[NameSpace.Data].offerDataStatusSending;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;
