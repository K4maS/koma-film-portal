import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import PageMessage from '../../components/MessageBlock/MessageBlock';
import { useAppSelector } from '../../hooks/storeHooks';
import { kpFullFilmType } from '../../types/filmTypes';
import { GetIndexOfUserById } from '../../util/getIndexOfUserById';
import { DividePages } from '../../util/dividePages';
import { PageContext } from '../../contextAPI/AppContext/AppContextProvider';

export default function LikedFilms() {
	const allLikedFilmsIdList = useAppSelector((state) => state.users.likedFilms);
	const usersList = useAppSelector((state) => state.users.usersList);
	const pageData = useContext(PageContext);

	const currentUserId = useAppSelector((state) => state.users.currentUserId);
	const likedFilms = useAppSelector((state) => state.users.usersList);

	const [likedFilmsIdList, setLikedFilmsIdList] = useState<number[]>([]);

	useEffect(() => {
		if (currentUserId !== null && likedFilms !== undefined) {
			const index = GetIndexOfUserById(usersList, currentUserId);
			setLikedFilmsIdList(likedFilms[index].likedFilmsId);
		}
	}, [likedFilms]);

	function filmsFilter(data: kpFullFilmType[]): Array<kpFullFilmType[]> | [] {
		let pageLikedFilms: Array<kpFullFilmType[]> | [] = [];

		if (data) {
			const pagedFilms = data.filter(
				(elem: kpFullFilmType): kpFullFilmType | undefined => {
					if (likedFilmsIdList && likedFilmsIdList.includes(elem.kinopoiskId)) {
						return elem;
					}
				},
			);
			pageLikedFilms = DividePages(pagedFilms);
			console.log(pageLikedFilms, pageData);
		}

		return pageLikedFilms;
	}

	return (
		<div>
			<Header></Header>
			<div className="container">
				{currentUserId === null ? (
					<PageMessage title="Авторизуйтесь чтобы увидеть ваш список любимых фильмов" />
				) : filmsFilter(allLikedFilmsIdList).length <= 0 ? (
					<PageMessage title="Список пуст" />
				) : filmsFilter(allLikedFilmsIdList) && pageData ? (
					<FilmsList
						pages={filmsFilter(allLikedFilmsIdList).length}
						onChangePage={pageData?.changeCurrentPage}
						data={filmsFilter(allLikedFilmsIdList)[pageData?.currentPage]}
					></FilmsList>
				) : null}
			</div>
		</div>
	);
}
