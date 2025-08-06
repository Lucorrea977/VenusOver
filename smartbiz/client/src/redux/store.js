import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import sales from './slices/sales';
import prods from './slices/prods';

export const store = configureStore({
  reducer: { auth, sales, prods }
});
