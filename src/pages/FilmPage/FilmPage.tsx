import { useParams } from 'react-router-dom';
import { FilmCard } from '../../components/FilmICard/FilmICard';
import { Header } from '../../components/Header/Header';
import { useGetFilmByIdQuery } from '../../store/actions/fimlsApi';
import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';

export const FilmPage = () => {
	const { id } = useParams();
	const { data, isLoading, error } = useGetFilmByIdQuery(id);

	return (
		<div>
			<Header></Header>
			<div className="container">
				{error ? (
					<ErrorBlock text={'Не удалось загрузить'} />
				) : isLoading ? (
					<LoadingProcess />
				) : data ? (
					<FilmCard data={data}></FilmCard>
				) : null}
			</div>
		</div>
	);
};
