import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilmStateType, filmType } from '../../../types';
// Удалить?
export type User = {user: {
     
}};


const initialState: FilmStateType = {
  films: [],
};

const userSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<filmType | []>) => {
      state.films = action.payload;
    },
   },
 
});

export const {
  updateUser
} = userSlice.actions;
export default userSlice.reducer;
