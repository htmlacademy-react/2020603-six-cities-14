import { userProcess } from './users-process/user-process-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { appProcess } from './app-process/app-process-slice';
import { offersData } from './offer-data/offer-data-slice';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});
