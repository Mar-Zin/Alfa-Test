import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cardsReducer from "./cards";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  cards: cardsReducer,
  favorites: favoritesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk = ThunkAction<Promise<any>, RootState, unknown, Action>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
