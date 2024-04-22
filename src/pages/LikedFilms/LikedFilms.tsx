import React, { useEffect, useState } from 'react';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import PageMessage from '../../components/MessageBlock/MessageBlock';
import { useAppSelector } from '../../hooks/storeHooks';
import { kpFullFilmType } from '../../types/filmTypes';
import { GetIndexOfUserById } from '../../util/getIndexOfUserById';

export default function LikedFilms() {
	const allLikedFilmsIdList = useAppSelector((state) => state.users.likedFilms);
	const usersList = useAppSelector((state) => state.users.usersList);

	const currentUserId = useAppSelector((state) => state.users.currentUserId);
	const likedFilms = useAppSelector((state) => state.users.usersList);

	const [likedFilmsIdList, setLikedFilmsIdList] = useState<number[]>([]);

	useEffect(() => {
		if (currentUserId !== null && likedFilms !== undefined) {
			const index = GetIndexOfUserById(usersList, currentUserId);
			setLikedFilmsIdList(likedFilms[index].likedFilmsId);
		}
	}, [likedFilms]);

	function filmsFilter(data: kpFullFilmType[]): kpFullFilmType[] | [] {
		if (data) {
			return data.filter((elem: kpFullFilmType): kpFullFilmType | undefined => {
				if (likedFilmsIdList && likedFilmsIdList.includes(elem.kinopoiskId)) {
					return elem;
				}
			});
		}

		return [];
	}

	return (
		<div>
			<Header></Header>
			<div className="container">
				{currentUserId === null ? (
					<PageMessage title="Авторизуйтесь чтобы увидеть ваш список любимых фильмов" />
				) : filmsFilter(allLikedFilmsIdList).length <= 0 ? (
					<PageMessage title="Список пуст" />
				) : filmsFilter(allLikedFilmsIdList) ? (
					<FilmsList data={filmsFilter(allLikedFilmsIdList)}></FilmsList>
				) : null}
			</div>
		</div>
	);
}
