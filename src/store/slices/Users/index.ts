import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { kpFilmType } from "../../../types";

type UsersType = Array<{
  id: number;
  login: string;
  password: string;
  likedFilmsId: number[];
}>
type InitialState = {
  users: UsersType;  
  likedFilms: kpFilmType[];
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

  likedFilms: [{
        "kinopoiskId": 602675,
        "nameRu": "Каменщик",
        "nameEn": "The Bricklayer",
        "year": 2023,
        "posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/602675.jpg",
        "posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/602675.jpg",
        "countries": [
          {
            "country": "США"
          },
          {
            "country": "Болгария"
          },
          {
            "country": "Греция"
          }
        ],
        "genres": [
          {
            "genre": "боевик"
          },
          {
            "genre": "триллер"
          }
        ],
        "duration": 110,
        "premiereRu": "2024-01-04"
      }
  ]
}

export const usersSlice = createSlice({
    name: 'users', 
    initialState, 
    reducers: {
      addLikedFilm: (state, action: PayloadAction<{index: number, id: number}>| null) =>  {
       if(action?.payload.index !== undefined && action?.payload.index !== undefined ){ 
        const {index, id} = action.payload;
        state.users[index].likedFilmsId.push(id)}
      },
      removeFilmFromLiked: (state, action: PayloadAction<{index: number, id: number}>| null) =>  {
        if(action?.payload.index !== undefined && action?.payload.index !== undefined ){ 
         const {index, id} = action.payload;
         const likedFilmsId = state.users[index].likedFilmsId;
         const likedFilmIdIndex = likedFilmsId.indexOf(id);
         state.users[index].likedFilmsId.splice(likedFilmIdIndex, 1);
       }
      },
    }
})

export const {addLikedFilm, removeFilmFromLiked} = usersSlice.actions;
export default usersSlice.reducer;

