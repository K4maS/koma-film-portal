import { useParams } from 'react-router-dom';
import { FilmCard } from '../../components/FilmICard/FilmICard';
import { Header } from '../../components/Header/Header';
import { useGetFilmByIdQuery } from '../../store/actions/fimlsApi';
import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';
import React, { useMemo } from 'react';

export default function FilmPage() {
	const { id } = useParams();
	const { data, isLoading, error } = useGetFilmByIdQuery(id);
	const memoisedData = useMemo(() => data, [data]);

	return (
		<div>
			<Header></Header>
			<div className="container">
				{error ? (
					<ErrorBlock text={'Не удалось загрузить'} />
				) : isLoading ? (
					<LoadingProcess />
				) : memoisedData ? (
					<FilmCard data={memoisedData}></FilmCard>
				) : null}
			</div>
		</div>
	);
}
