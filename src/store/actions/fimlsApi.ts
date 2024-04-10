import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {kp_key, key} from '../../API/api_key';

export const filmsApi = createApi({
  reducerPath: 'films',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api', 
    method: 'GET',
    headers: {
      'X-API-KEY': kp_key,
      'Content-Type': 'application/json',
    }
  ,
  }),
  endpoints: (builder) => ({
    getFilms: builder.query({
      query: () => '/v2.2/films/premieres?year=2024&month=JANUARY',
    }),
    getFilmById: builder.query({
      query: (id) => id,
    }),
    
  }),
});



// export const filmsApi = createApi({
//   reducerPath: 'films',
//   baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/?apikey=${key}&`}),
//   endpoints: (builder) => ({
//     getFilms: builder.query({
//       query: () => '&i=tt3896198',
//     }),
//     getFilmById: builder.query({
//       query: (id) => id,
//     }),
    
//   }),
// });



// export const filmsApi = createApi({ 

//   reducerPath: 'starWars', 

//   baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api" }), 

//   endpoints: (builder) => ({ 

//     getFilms: builder.query({ 

//       query: () => `/films?format=json` 

//     }), 

//     getFilmById: builder.query({ 

//       query: (filmId) => `/films/${filmId}?format=json` 

//     }) 

//   }), 

// }) 

export const {
  useGetFilmsQuery,
  useGetFilmByIdQuery,
} = filmsApi;