import { configureStore } from '@reduxjs/toolkit';

import artworksReducer from './artworks';
import departmentsReducer from './departments';
import searchReducer from './search';

export const store = configureStore({
  reducer: {
    departments: departmentsReducer,
    artworks: artworksReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
