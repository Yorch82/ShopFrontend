import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import products from '../features/products/productsSlice';
import cart from '../features/cart/index';

export const store = configureStore({
  reducer: {
    auth,
    products,
    cart
  },
});