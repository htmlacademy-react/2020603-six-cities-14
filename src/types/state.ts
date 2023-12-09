import { store } from '../store/index.ts';
import { AxiosInstance } from 'axios';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAPI = {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  state: State;
}
