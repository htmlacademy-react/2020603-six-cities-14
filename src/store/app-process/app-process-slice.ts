import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActiveCity } from '../../types/city';
import { AppProcess } from '../../types/slice';
import { NameSpace } from '../../const';

const initialState: AppProcess = {
  activeCity: 'Paris',
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<{city: ActiveCity}>) => {
      const { city } = action.payload;
      state.activeCity = city;
    },

    setError:  (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCity, setError } = appProcess.actions;
