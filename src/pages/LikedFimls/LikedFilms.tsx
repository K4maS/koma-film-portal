import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';
import PageMessage from '../../components/MessageBlock/MessageBlock';
import { useAppSelector } from '../../hooks/storeHooks';
import { useGetFilmsFilteredQuery } from '../../store/actions/fimlsApi';
import { kpFullFilmType } from '../../types/filmTypes';

export const LikedFilms = () => {
	const allLikedFilmsIdList = useAppSelector((state) => state.users.likedFilms);

	const currentUserId = useAppSelector((state) => state.users.currentUserId);
	const likedFilmsIdList = useAppSelector((state) => {
		if (currentUserId !== null) {
			return state.users.usersList[currentUserId]?.likedFilmsId;
		}
	});

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
};
