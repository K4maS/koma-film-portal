import { useEffect, useState } from 'react';
import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';
import useAppSelector from '../../hooks/storeHooks';
import { useGetFilmsQuery } from '../../store/actions/fimlsApi';
import { kpFilmType } from '../../types';

export const LikedFilms = () => {
	// const likedFilmsIdList = useAppSelector((state) => {
	// 	return state.users.users[0].likedFilmsId;
	// });
	const [dataFiltered, setDataFiltered] = useState([]);

	const { data, isLoading, error } = useGetFilmsQuery(null);
	
	// // const data: [] | kpFilmType[] = [];
	// useEffect(() => {
	// 	const filteredList = data.items.filter(
	// 		(elem: kpFilmType): kpFilmType | undefined => {
	// 			if (likedFilmsIdList.includes(elem.kinopoiskId)) {
	// 				return elem;
	// 			}
	// 		}
	// 	);

	// 	setDataFiltered(filteredList);
	// }, [data]);

	return (
		<div>
			<Header></Header>
			<div className="container">
				{error ? (
					<ErrorBlock text={'Не удалось загрузить'} />
				) : isLoading ? (
					<LoadingProcess />
				) : dataFiltered.length > 0 ? (
					<FilmsList data={dataFiltered}></FilmsList>
				) : null}
			</div>
		</div>
	);
};
