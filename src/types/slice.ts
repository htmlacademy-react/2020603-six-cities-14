import { ActiveCity } from './city';
import { Favorite, Offer, SelectedOffer } from './offer';
import { ReviewType } from './review';
import { UserData } from './user-data';
import { AuthStatus, LoadingDataStatus } from '../const';

export type UserProcess = {
  authStatus: AuthStatus;
  userData: UserData;
}


export type OffersData = {
  'offers': Offer[];
  'hasError': boolean;
  'isOffersLoading': boolean;
  'selectedOffer': null | SelectedOffer;
  'nearPlaces': Offer[];
  'reviews': ReviewType[];
  'offerDataStatusSending': LoadingDataStatus;
  'reviewStatusSending': LoadingDataStatus;
  'favs': Favorite[];
  'favsLoadingStatus': LoadingDataStatus;
}

export type AppProcess = {
  'activeCity': ActiveCity;
  'error': string | null;
}
