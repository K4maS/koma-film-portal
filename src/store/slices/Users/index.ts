import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {  kpFullFilmType, kpFilterType } from "../../../types/filmTypes";
import { authDataType } from "../../../types/userTypes";

type UserType = {
  id: number;
  login: string;
  password: string;
  likedFilmsId: number[];
}

type InitialState = {
  usersList: UserType[];  
  currentUserId: number | null;
  userError: string | null;
  likedFilms:  kpFullFilmType[],
  filmsFilter: kpFilterType ;
}

export const filterExample: kpFilterType = {
  keyword: undefined,
  order: 'RATING',
  type: 'ALL',
  ratingFrom: undefined,
  ratingTo: undefined,
  yearFrom: undefined,
  yearTo: undefined,
  page: 1,
};

const initialState: InitialState = {
  usersList: [
    {
     id: 0,
     login: 'Admin',
     password: 'Admin',
     likedFilmsId: [],
     }
  ],
  filmsFilter: filterExample,
  currentUserId: 0,
  userError: null, 
  likedFilms: [],
}

export const usersSlice = createSlice({
    name: 'users', 
    initialState, 
    reducers: {
      // Добавление ID фильма в список избранных
      addLikedFilm: (state, action: PayloadAction<{film: kpFullFilmType}>) =>  {
        const userId = state.currentUserId;
          const id = action?.payload.film.kinopoiskId;
        
        if(id !== undefined && userId !== null ){ 
          const likedidList = state.usersList[userId].likedFilmsId;
          if(!likedidList.includes(id)){

            state.usersList[userId].likedFilmsId = [...state.usersList[userId].likedFilmsId, id];
            
            const checkLikedFilm = state.likedFilms.find((elem)=> elem.kinopoiskId === action.payload.film.kinopoiskId);

            if(!checkLikedFilm){
              state.likedFilms = [...state.likedFilms, action.payload.film];
              localStorage.setItem('likedFilms', JSON.stringify(state.likedFilms));
            }

            localStorage.setItem('users', JSON.stringify(state.usersList));
      
          }
        }
        
        
      },

      // Удаление ID фильма из списка
      removeFilmFromLiked: (state, action: PayloadAction<{id: number}>) =>  {
        const userId = state.currentUserId;

        if(action?.payload.id !== undefined && userId !== null  ){ 
         const {id} = action.payload;
         const likedFilmsId = state.usersList[userId].likedFilmsId;
         const likedFilmIduserId = likedFilmsId.indexOf(id);
         state.usersList[userId].likedFilmsId.splice(likedFilmIduserId, 1);
       }
       

       localStorage.setItem('users', JSON.stringify(state.usersList));
      },

      // Обновление списка пользователей
      updateUsers: (state, action: PayloadAction<UserType[]>)=> {
        state.usersList = action.payload;
      },

      // Изменение статуса текущего пользователя
      updateCurrentUserId: (state, action: PayloadAction<number>)=> {
        state.currentUserId = action.payload;
      },
      
      // Изменение текущей страницы
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.filmsFilter.page = action.payload;
      },
       // Изменение параметров фильтра
      setFilterSettings: (state, action: PayloadAction<kpFilterType>) => {
        state.filmsFilter = action.payload;
      },
      
      // Обновление списка любимых фильмов
      updateLikedFilmsList: (state, action: PayloadAction<kpFullFilmType[]>)=> {
        state.likedFilms = action.payload;
      },

      
      // Добавление пользователя
      createUser: (state, action: PayloadAction<UserType>) => {
        const { login, password } = action.payload;
      
        state.userError = null;
        
        let id = 0;
        let loginIsExist = false;
      
        state.usersList.forEach((elem) => {
          if (elem.id > id) {
            id = elem.id + 1;
          }
        });
      
        state.usersList.find((elem) => {
          if (elem.login === login) {
            loginIsExist = true;
          }
        });
      
        if (!loginIsExist) {
          const userData = {
            id,
            login,
            password,
            likedFilmsId: [],
          };


          state.usersList = [...state.usersList, userData]; // Обновляем поле usersList в state

          localStorage.setItem('users', JSON.stringify(state.usersList));
        } else {
          state.userError = 'Такой логин уже существует';
        }
      },

      //Авторизация
      doAuthorization: (state, action: PayloadAction<authDataType>) => {
        
        state.userError = null;
        
        const {login, password} = action.payload;

        console.log(state.usersList, login, password);
        let user = state.usersList.find((elem) => elem.login === login && elem.password === password);
        console.log(user)
        if(user !== undefined) {
          state.currentUserId = Number(user.id);
          localStorage.setItem('currentUserId', JSON.stringify(user.id));
        }
        else {
          state.userError = 'Неверный пароль или логин';
        }
          
      },

      //Выход из аккаунта
      doUserExid: (state) => {
        state.currentUserId = null;
        localStorage.setItem('currentUserId', JSON.stringify(state.currentUserId));
      },
    }
})

export const {
  addLikedFilm, 
  removeFilmFromLiked, 
  setCurrentPage, 
  updateUsers, 
  updateCurrentUserId, 
  createUser, doAuthorization, 
  doUserExid,
  updateLikedFilmsList,
  setFilterSettings,
} = usersSlice.actions;
export default usersSlice.reducer;

