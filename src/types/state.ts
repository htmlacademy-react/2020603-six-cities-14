import { AuthStatus, CityName } from '../const';
import { store } from '../store';
import { Offer } from '.';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type OffersData = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
}

export type CityData = {
  city: CityName;
}

export type UserInfo = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}

export type AutorizationData = {
  authorizationStatus: AuthStatus;
};

export type FavoritesData = {
  favoriteOffers: Offer[];
  isLoading: boolean;
  hasError: boolean;
}
