import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {kp_key} from '../../API/api_key';
import { URL } from '../../API/api_url';

export const filmsApi = createApi({
  reducerPath: 'films',
  baseQuery: fetchBaseQuery({
    baseUrl: URL, 
    method: 'GET',
    headers: {
      'X-API-KEY': kp_key,
      'Content-Type': 'application/json',
    }
  ,
  }),
  endpoints: (builder) => ({
    getFilms: builder.query({
      query: () => '/api/v2.2/films/premieres?year=2024&month=JANUARY',
    }),
    getFilmById: builder.query({
      query: (id) => `/api/v2.2/films/${id}`,
    }),
    
  }),
});



export const {
  useGetFilmsQuery,
  useGetFilmByIdQuery,
} = filmsApi;