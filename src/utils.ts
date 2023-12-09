import dayjs from 'dayjs';
import { store } from './store';
import { clearErrorAction } from './store/api-actions';
import { setError } from './store/app-process/app-process-slice';

export function convertDateInMs(value: string) {
  return Date.parse(value);
}

export function formatDate(value: dayjs.ConfigType, full: boolean = false): string {
  return dayjs(value).format(full ? 'MMMM YYYY' : 'YYYY-MM-DD');
}

export function getRatingValue(rating: number) {
  return (Math.round(rating) * 100) / 5;
}

export function pickRandomElement<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function processErrorHandle(message: string): void {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
}
