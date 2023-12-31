import { ActiveCity } from './types/city';

export const BASE_URL = 'https://14.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const TIMEOUT_SHOW_ERROR = 2000;
export const MAX_REVIEWS_COUNT = 10;

export const PlacemarkPath = {
  Default: '../markup/img/pin.svg',
  Active: '../markup/img/pin-active.svg',
} as const;

export const CommentLength = {
  Min: 50,
  Max: 300,
} as const;

export const cities: ActiveCity[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorite = '/favorites',
  Offer = '/offer/',
  NotFound = '/*',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  SelectedOffer = '/offers/',
  Reviews = '/comments/',
  Favorite = '/favorite',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum LoadingDataStatus {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export const SortingOption = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export const Assessment = {
  Perfect: 'perfect',
  Good: 'good',
  NotBad: 'not bad',
  Badly: 'badly',
  Terribly: 'terribly',
} as const;
