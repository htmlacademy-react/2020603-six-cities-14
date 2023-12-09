import { Location } from './location';

export type City = {
  name: ActiveCity;
  location: Location;
}

export type ActiveCity = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type CityLocationType = {
  title: City['name'];
  lat: number;
  lng: number;
  zoom: number;
}
