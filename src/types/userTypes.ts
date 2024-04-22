import { kpFilterType, kpFullFilmType } from './filmTypes';

export type authDataType = { login: string; password: string };

export type UserType = {
	id: number;
	login: string;
	password: string;
	likedFilmsId: number[];
};

export type InitialStateType = {
	usersList: UserType[];
	currentUserId: number | null;
	userError: string | null;
	likedFilms: kpFullFilmType[];
	filmsFilter: kpFilterType;
};
