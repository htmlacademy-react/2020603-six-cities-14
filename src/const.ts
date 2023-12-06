import { Review } from './types';

export const REQUEST_TIMEOUT = 5000;
export const ERROR_STATUS_CODE = 404;
export const ERROR_ROUTE = '404';
export const COMMENT_MIN_LENGTH = 50;
export const COMMENT_MAX_LENGTH = 300;
export const COMMENTS_MAX_COUNT = 10;
export const OFFERS_NEARBY_MAX_COUNT = 3;
export const PHOTOS_IN_GALLERY_MAX_COUNT = 6;

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
}

export enum NameSpace {
  Offers = 'OFFERS',
  City = 'CITY',
  AuthorizationStatus = 'AUTORIZATION_STATUS',
  User = 'USER',
  Favorites = 'FAVORITES',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type CityName = typeof cities[number];

export enum MarkerUrl {
  Default = 'src/static/pin.svg',
  Active = 'src/static/pin-active.svg',
}

export enum SortingOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const EmptyReview: Review = {
  rating: 0,
  comment: '',
} as const;
