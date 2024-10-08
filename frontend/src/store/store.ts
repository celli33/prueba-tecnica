import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from './itemsSlice.js';

const store = configureStore({
  reducer: {
    items: itemsSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
