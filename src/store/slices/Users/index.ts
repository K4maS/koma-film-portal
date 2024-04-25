import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { kpFullFilmType, kpFilterType } from '../../../types/filmTypes';
import {
	InitialStateType,
	UserType,
	authDataType,
	colorThemeType,
} from '../../../types/userTypes';
import { GetIndexOfUserById } from '../../../util/getIndexOfUserById';

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

const initialState: InitialStateType = {
	usersList: [
		{
			id: 0,
			login: 'Admin',
			password: 'Admin',
			likedFilmsId: [],
		},
	],
	filmsFilter: filterExample,
	currentUserId: 0,
	userError: null,
	likedFilms: [],
	colorTheme: 'ligth',
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		// Добавление ID фильма в список избранных
		addLikedFilm: (state, action: PayloadAction<{ film: kpFullFilmType }>) => {
			const userId = state.currentUserId;
			const id = action?.payload.film.kinopoiskId;
			const likedFilmsList = [...state.likedFilms];
			const usersList = JSON.parse(JSON.stringify(state.usersList));

			if (id !== undefined && userId !== null) {
				const userIndex = GetIndexOfUserById(usersList, userId);

				const likedIdList = usersList[userIndex].likedFilmsId;
				if (!likedIdList.includes(id)) {
					usersList[userIndex].likedFilmsId = [
						...usersList[userIndex].likedFilmsId,
						id,
					];

					state.usersList = usersList;

					const checkLikedFilm = likedFilmsList.find(
						(elem) => elem.kinopoiskId === id,
					);

					if (!checkLikedFilm) {
						state.likedFilms = [...likedFilmsList, action.payload.film];
						localStorage.setItem(
							'likedFilms',
							JSON.stringify(state.likedFilms),
						);
					}

					localStorage.setItem('users', JSON.stringify(state.usersList));
				}
			}
		},

		// Удаление ID фильма из списка
		removeFilmFromLiked: (state, action: PayloadAction<{ id: number }>) => {
			const userId = state.currentUserId;

			const usersList = JSON.parse(JSON.stringify(state.usersList));

			if (userId !== null) {
				const index = GetIndexOfUserById(usersList, userId);

				if (action?.payload.id !== undefined && userId !== null) {
					const { id } = action.payload;
					const usersList = JSON.parse(JSON.stringify(state.usersList));
					const likedFilmsId = state.usersList[index].likedFilmsId;
					const likedFilmIduserId = likedFilmsId.indexOf(id);
					usersList[index].likedFilmsId.splice(likedFilmIduserId, 1);
					state.usersList = usersList;
				}

				localStorage.setItem('users', JSON.stringify(state.usersList));
			}
		},

		// Обновление списка пользователей
		updateUsers: (state, action: PayloadAction<UserType[]>) => {
			state.usersList = action.payload;
		},

		// Изменение статуса текущего пользователя
		updateCurrentUserId: (state, action: PayloadAction<number>) => {
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
		updateLikedFilmsList: (state, action: PayloadAction<kpFullFilmType[]>) => {
			state.likedFilms = action.payload;
		},

		// Добавление пользователя
		createUser: (state, action: PayloadAction<authDataType>) => {
			const { login, password } = action.payload;

			state.userError = null;

			let id = 0;
			let loginIsExist = false;

			const usersList: UserType[] = JSON.parse(JSON.stringify(state.usersList));

			usersList.forEach((elem) => {
				if (elem.id >= id) {
					id = elem.id;
				}
			});

			id = id + 1;

			usersList.find((elem) => {
				if (elem.login === login) {
					loginIsExist = true;
				}
			});
			if (login.length < 2 || login.length > 30) {
				state.userError = 'Логин должен быть длиннее 2 и короче 30 символов';
			} else if (loginIsExist) {
				state.userError = 'Такой логин уже существует';
			} else if (password.length < 8 || password.length > 30) {
				state.userError = 'Просль должен быть длиннее 8 и короче 30 символов';
			} else {
				const userData = {
					id,
					login,
					password,
					likedFilmsId: [],
				};

				state.usersList = [...usersList, userData]; // Обновляем поле usersList в state

				localStorage.setItem('users', JSON.stringify(state.usersList));
			}
		},

		//Авторизация
		doAuthorization: (state, action: PayloadAction<authDataType>) => {
			state.userError = null;

			const { login, password } = action.payload;
			const usersList: UserType[] = JSON.parse(JSON.stringify(state.usersList));

			const user = usersList.find(
				(elem) => elem.login === login && elem.password === password,
			);

			if (login.length < 2 || login.length > 30) {
				state.userError = 'Логин должен быть длиннее 2 и короче 30 символов';
			} else if (password.length < 8 || password.length > 30) {
				state.userError = 'Просль должен быть длиннее 8 и короче 30 символов';
			} else if (user === undefined) {
				state.userError = 'Неверный пароль или логин';
			} else {
				state.currentUserId = Number(user.id);
				localStorage.setItem('currentUserId', JSON.stringify(user.id));
			}
		},

		//Выход из аккаунта
		doUserExid: (state) => {
			state.currentUserId = null;
			localStorage.setItem(
				'currentUserId',
				JSON.stringify(state.currentUserId),
			);
		},

		setErrorMessage: (state, action: PayloadAction<string | null>) => {
			state.userError = action.payload;
		},

		setColorTheme: (state, action: PayloadAction<colorThemeType>) => {
			state.colorTheme = action.payload;
			localStorage.setItem('colorTheme', JSON.stringify(state.colorTheme));
		},
	},
});

export const {
	addLikedFilm,
	removeFilmFromLiked,
	setCurrentPage,
	updateUsers,
	updateCurrentUserId,
	createUser,
	doAuthorization,
	doUserExid,
	updateLikedFilmsList,
	setFilterSettings,
	setErrorMessage,
	setColorTheme,
} = usersSlice.actions;
export default usersSlice.reducer;
