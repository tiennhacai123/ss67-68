// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './components/bookSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
