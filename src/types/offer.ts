import { Host } from './host';
import { Location } from './location';
import { City } from './city';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage?: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type SelectedOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: Array<string>;
  host: Host;
  images: Array<string>;
  maxAdults: number;
}

export type Favorite = Offer;
