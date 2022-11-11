import { AppThunk, RootState } from "./store";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { iCardItem } from "../../models";
import cardsService from "../services/cardService";

interface CardsState {
  entities: iCardItem[];
  error: string;
  isLoading: boolean;
}

const initialState: CardsState = {
  entities: [],
  error: "",
  isLoading: true,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    cardsRequested: (state) => {
      state.isLoading = true;
    },
    cardsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    cardsRequestFailed: (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    cardRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload
      );
    },
    cardRemovedFailed: (state, action) => {
      state.error = action.payload.message;
    },
  },
});
const cardRemoveRequested = createAction("catalog/cardRemoveRequested");

const { actions, reducer: cardsReducer } = cardsSlice;
const {
  cardsRequested,
  cardsReceved,
  cardsRequestFailed,
  cardRemoved,
  cardRemovedFailed,
} = actions;

export const loadCardList = (): AppThunk => async (dispatch) => {
  dispatch(cardsRequested());
  try {
    const { results } = await cardsService.get();
    dispatch(cardsReceved(results));
  } catch (error) {
    dispatch(cardsRequestFailed(error));
  }
};

export const removeCard =
  (id: number): AppThunk =>
  async (dispatch) => {
    dispatch(cardRemoveRequested());
    try {
      dispatch(cardRemoved(id));
    } catch (error) {
      dispatch(cardRemovedFailed(error));
    }
  };

export const getCards = () => (state: RootState) => state.cards.entities;
export const getCardsLoadingStatus = () => (state: RootState) =>
  state.cards.isLoading;
export const getItemById = (id: number) => (state: RootState) => {
  if (state.cards.entities) {
    return state.cards.entities.find((item: iCardItem) => item.id === id);
  }
};
export const getError = () => (state: RootState) => state.cards.error;

export default cardsReducer;
