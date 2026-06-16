import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import eventsReducer from './eventsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    events: eventsReducer,
  },
});

export default store;
