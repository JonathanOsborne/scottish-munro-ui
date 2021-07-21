/* eslint-disable import/no-cycle */
import { configureStore, Store, ThunkAction } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { munroSlice } from '@/store/munroSlice';

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

const rootReducer = combineReducers({
  munro: munroSlice.reducer,
});

const makeStore = (): Store => {
  const store: Store = configureStore({
    reducer: rootReducer,
  });
  return store;
};

export const wrapper = createWrapper<AppStore>(makeStore);
