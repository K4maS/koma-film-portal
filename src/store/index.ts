import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filmsApi } from './actions/fimlsApi';
import { usersSlice } from './slices/Users';

const rootReducer = combineReducers({
      users: usersSlice.reducer,
      [filmsApi.reducerPath]: filmsApi.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(filmsApi.middleware), 
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
