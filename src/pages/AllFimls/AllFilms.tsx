import { useSelector } from 'react-redux';
import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';
import { useAppSelector } from '../../hooks/storeHooks';
import { useGetFilmsFilteredQuery } from '../../store/actions/fimlsApi';

export const AllFilms = () => {
	
	const page = useAppSelector((state: any) => state.users?.currentPage);
	const { data, isLoading, error } = useGetFilmsFilteredQuery({ page });

	return (
		<div>
			<Header></Header>
			<div className="container">
				{error ? (
					<ErrorBlock text={'Не удалось загрузить'} />
				) : isLoading ? (
					<LoadingProcess />
				) : data ? (
					<FilmsList data={data.items}></FilmsList>
				) : null}
			</div>
		</div>
	);
};
