import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../redux/favoriteSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
