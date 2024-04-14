import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { kpFilmType } from "../../../types";

type UsersType = {
  id: number;
  login: string;
  password: string;
  likedFilmsId: number[];
}
type InitialState = {
  users: UsersType[];  
  currentPage: number,
  currentUserId: number | null;
}
const initialState: InitialState = {
  users: [
   {
    id: 0,
    login: '',
    password: '',
    likedFilmsId: [],
    }
  ],
  currentPage: 1,
  currentUserId: 0,
}

export const usersSlice = createSlice({
    name: 'users', 
    initialState, 
    reducers: {
      // Добавление ID фильма в список избранных
      addLikedFilm: (state, action: PayloadAction<{id: number}>) =>  {
        const userId = state.currentUserId;

        if(action?.payload.id !== undefined && userId !== null ){ 
          const {id} = action.payload;
          const likedidList = state.users[userId].likedFilmsId;
          if(!likedidList.includes(id)){
            state.users[userId].likedFilmsId.push(id)
          }
        }

        localStorage.setItem('users', JSON.stringify(state.users));
      },

      // Удаление ID фильма из списка
      removeFilmFromLiked: (state, action: PayloadAction<{id: number}>) =>  {
        const userId = state.currentUserId;

        if(action?.payload.id !== undefined && userId !== null  ){ 
         const {id} = action.payload;
         const likedFilmsId = state.users[userId].likedFilmsId;
         const likedFilmIduserId = likedFilmsId.indexOf(id);
         state.users[userId].likedFilmsId.splice(likedFilmIduserId, 1);
       }

       localStorage.setItem('users', JSON.stringify(state.users));
      },

      // Обновление списка пользователей
      updateUsers: (state, action: PayloadAction<UsersType[]>)=> {
        state.users = action.payload;
      },

      // Изменение текущей страницы(не используется, на будущее)
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
      
      // Добавление пользователя
      createUser: (state, action: PayloadAction<UsersType>) => {
        state.users.push(action.payload);
      },
    }
})

export const {addLikedFilm, removeFilmFromLiked, setCurrentPage, updateUsers} = usersSlice.actions;
export default usersSlice.reducer;

