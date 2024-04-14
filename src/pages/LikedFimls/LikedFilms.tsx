import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';
import { useAppSelector } from '../../hooks/storeHooks';
import { useGetFilmsFilteredQuery } from '../../store/actions/fimlsApi';
import { kpFilmType } from '../../types';

export const LikedFilms = () => {
	const page = useAppSelector((state) => state.users?.currentPage);
	const { data, isLoading, error } = useGetFilmsFilteredQuery({ page });

	const currentUserId = useAppSelector((state) => state.users.currentUserId);
	const likedFilmsIdList = useAppSelector((state) => {
		if (currentUserId !== null) {
			return state.users.users[currentUserId]?.likedFilmsId;
		}
	});

	function filmsFilter(data: kpFilmType[]): kpFilmType[] | [] {
		if (data) {
			return data.filter((elem: kpFilmType): kpFilmType | undefined => {
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
				{error ? (
					<ErrorBlock text={'Не удалось загрузить'} />
				) : isLoading ? (
					<LoadingProcess />
				) : filmsFilter(data.items).length <= 0 ? (
					<h1>Пусто</h1>
				) : data ? (
					<FilmsList data={filmsFilter(data.items)}></FilmsList>
				) : null}
			</div>
		</div>
	);
};
