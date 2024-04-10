import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './slices/Films';
import { filmsApi } from './actions/fimlsApi';

const store = configureStore({
  reducer: {
    film: filmReducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(filmsApi.middleware), 
});

export default store;

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
