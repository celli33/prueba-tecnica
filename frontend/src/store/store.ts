import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from './itemsSlice.js';

export default configureStore({
  reducer: {
    items: itemsSlice
  },
});
