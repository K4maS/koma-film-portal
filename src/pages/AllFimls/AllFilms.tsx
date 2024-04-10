import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Header } from '../../components/Header/Header';
import { useGetFilmsQuery } from '../../store/actions/fimlsApi';

export const AllFilms = () => {
	const { data, isLoading, error } = useGetFilmsQuery(null);
	return (
		<div>
			<Header></Header>
			<div className="container">
				{error ? (
					<div>error</div>
				) : isLoading ? (
					<div>Loading</div>
				) : data ? (
  
					<FilmsList data={data.items}></FilmsList>
				) : null}
			</div>
		</div>
	);
};
