import { createApi } from '../api/api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
