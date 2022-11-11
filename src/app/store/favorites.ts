import { RootState } from "./store";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";

interface FavoritesState {
  entities: number[];
}

const initialState: FavoritesState = {
  entities: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    favoritesReceved: (state, action) => {
      state.entities = action.payload;
    },
    favoriteAdded: (state, action) => {
      state.entities.push(action.payload);
    },
    favoriteRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (id: number) => id !== action.payload
      );
    },
  },
});

const { actions, reducer: favoritesReducer } = favoritesSlice;
const { favoritesReceved, favoriteAdded, favoriteRemoved } = actions;

export const loadFavoritesList = () => (dispatch: Dispatch) => {
  const data = localStorageService.getFavorites();
  dispatch(favoritesReceved(data));
};

export const changeFavorites =
  (id: number) => (dispatch: Dispatch, getState: any) => {
    if (getState().favorites.entities.includes(id)) {
      dispatch(favoriteRemoved(id));
    } else dispatch(favoriteAdded(id));
  };

export const removeFavorite =
  (id: number) => (dispatch: Dispatch, getState: any) => {
    if (getState().favorites.entities.includes(id))
      dispatch(favoriteRemoved(id));
  };

export const getFavorites = () => (state: RootState) =>
  state.favorites.entities;

export default favoritesReducer;
