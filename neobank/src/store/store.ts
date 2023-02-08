import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import LoanOffers from "./reducers/LoanOffersReducer";

export const store = configureStore({
  reducer: {
    updateInformation: LoanOffers,
  },
});

const rootReducer = combineReducers({
  updateInformation: LoanOffers,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppStore = ReturnType<typeof setupStore>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
