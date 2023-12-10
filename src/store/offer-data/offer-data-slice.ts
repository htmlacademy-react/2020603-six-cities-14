import { Offer } from '../../types/offer';
import { OffersData } from '../../types/slice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingDataStatus, NameSpace } from '../../const';
import { fetchFavoritesAction, fetchOffersAction, fetchSelectedOfferDataAction, postCommentAction, postFavStatusAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
  nearPlaces: [],
  reviews: [],
  favs: [],
  hasError: false,
  isOffersLoading: false,
  selectedOffer: null,
  offerDataStatusSending: LoadingDataStatus.Unsent,
  reviewStatusSending: LoadingDataStatus.Unsent,
  favsLoadingStatus: LoadingDataStatus.Unsent
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    updateNearPlaces: (state, action: PayloadAction<Offer>) => {
      const nearOffers = state.nearPlaces.map((place) => {
        if (place.id === action.payload.id) {
          place.isFavorite = !place.isFavorite;
        }
        return place;
      });

      state.nearPlaces = nearOffers;
    },
    dropFavOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.favs.findIndex((offer) => offer.id === action.payload.id);
      state.favs.splice(index, 1);
    },
    addFavOffer: (state, action: PayloadAction<Offer>) => {
      state.favs.push(action.payload);
    },
    updateOffers: (state, action: PayloadAction<Offer>) => {
      const offer = action.payload;
      const offers = state.offers.map((item: Offer) => {
        if (item.id === offer.id) {
          item.isFavorite = !item.isFavorite;
        }
        return item;
      });
      state.offers = offers;
    },
    dropAllFavorites: (state) => {
      state.favs = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      })
      .addCase(fetchSelectedOfferDataAction.pending, (state) => {
        state.offerDataStatusSending = LoadingDataStatus.Pending;
      })
      .addCase(fetchSelectedOfferDataAction.fulfilled, (state, action) => {
        const [selectedOffer, nearbyOffers, comments] = action.payload;
        state.selectedOffer = selectedOffer;
        state.nearPlaces = nearbyOffers;
        state.reviews = comments;
        state.offerDataStatusSending = LoadingDataStatus.Success;
      })
      .addCase(fetchSelectedOfferDataAction.rejected, (state) => {
        state.offerDataStatusSending = LoadingDataStatus.Error;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.reviewStatusSending = LoadingDataStatus.Pending;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviewStatusSending = LoadingDataStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.reviewStatusSending = LoadingDataStatus.Error;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favsLoadingStatus = LoadingDataStatus.Pending;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favsLoadingStatus = LoadingDataStatus.Success;
        state.favs = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favsLoadingStatus = LoadingDataStatus.Error;
      })
      .addCase(postFavStatusAction.fulfilled, (state) => {
        state.favsLoadingStatus = LoadingDataStatus.Success;
      });
  }
});

export const { updateOffers, dropAllFavorites, dropFavOffer, addFavOffer, updateNearPlaces } = offersData.actions;
