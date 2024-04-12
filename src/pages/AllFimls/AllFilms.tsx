import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';
import { useGetFilmsQuery } from '../../store/actions/fimlsApi';

export const AllFilms = () => {
	const { data, isLoading, error } = useGetFilmsQuery(null);
	return (
		<div>
			<Header></Header>
			<div className="container">
				{error ? (
					<ErrorBlock text={'Не удалось загрузить'} />
				) : isLoading ? (
					<LoadingProcess/> 
				) : data ? (
  
					<FilmsList data={data.items}></FilmsList>
				) : null}
			</div>
		</div>
	);
};
