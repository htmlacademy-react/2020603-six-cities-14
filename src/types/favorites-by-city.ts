import { Offer } from './offer';

type City = string;

export type FavoritesByCity = {
  [key: City]: Array<Offer>;
};
