import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import PageMessage from '../../components/MessageBlock/MessageBlock';
import { useAppSelector } from '../../hooks/storeHooks';
import { GetIndexOfUserById } from '../../util/getIndexOfUserById';
import { PageContext } from '../../contextAPI/AppContext/AppContextProvider';
import { FilmsFilter } from '../../util/filmsFilter';

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

	const FilmsFilterMemo = useCallback(FilmsFilter, [likedFilmsIdList]);

	return (
		<div>
			<div className="container">
				{currentUserId === null ? (
					<PageMessage title="Авторизуйтесь чтобы увидеть ваш список любимых фильмов" />
				) : FilmsFilterMemo(allLikedFilmsIdList, likedFilmsIdList).length <=
				  0 ? (
					<PageMessage title="Список пуст" />
				) : FilmsFilterMemo(allLikedFilmsIdList, likedFilmsIdList) &&
				  pageData ? (
					<FilmsList
						pages={
							FilmsFilterMemo(allLikedFilmsIdList, likedFilmsIdList).length
						}
						onChangePage={pageData?.changeCurrentPage}
						data={
							FilmsFilterMemo(allLikedFilmsIdList, likedFilmsIdList)[
								pageData?.currentPage
							]
						}
					></FilmsList>
				) : null}
			</div>
		</div>
	);
}
