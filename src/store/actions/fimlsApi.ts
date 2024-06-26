import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { kp_key } from '../../API/api_key';
import { URL } from '../../API/api_url';

export const filmsApi = createApi({
	reducerPath: 'films',
	baseQuery: fetchBaseQuery({
		baseUrl: URL,
		method: 'GET',
		headers: {
			'X-API-KEY': kp_key,
			'Content-Type': 'application/json',
		},
	}),
	endpoints: (builder) => ({
		getFilmsPremiers: builder.query({
			query: () => `/api/v2.2/films/premieres?year=2024&month=JANUARY`,
		}),
		getFilmById: builder.query({
			query: (id) => `/api/v2.2/films/${id}`,
		}),

		getFilmsFiltered: builder.query({
			query: ({
				keyword = '',
				order = 'RATING',
				type = 'ALL',
				ratingFrom = 0,
				ratingTo = 10,
				yearFrom = 1000,
				yearTo = 3000,
				page = 1,
			}) =>
				`/api/v2.2/films?order=${order}&type=${type}&ratingFrom=${ratingFrom}&ratingTo=${ratingTo}&yearFrom=${yearFrom}&yearTo=${yearTo}&keyword=${encodeURI(
					keyword,
				)}&page=${page}`,
		}),
	}),
});

export const {
	useGetFilmsPremiersQuery,
	useGetFilmByIdQuery,
	useGetFilmsFilteredQuery,
} = filmsApi;
