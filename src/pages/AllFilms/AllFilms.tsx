import React from 'react';
import { ErrorBlock } from '../../components/ErrorBlock/ErrorBlock';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { FilterBlock } from '../../components/FilterBlock/FilterBlock';
import { Header } from '../../components/Header/Header';
import { LoadingProcess } from '../../components/LoadingProcess/LoadingProcess';
import PageMessage from '../../components/MessageBlock/MessageBlock';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { useGetFilmsFilteredQuery } from '../../store/actions/fimlsApi';
import style from './allFilms.module.css';
import { setCurrentPage } from '../../store/slices/Users';

export default function AllFilms() {
	const filter = useAppSelector((state) => state.users.filmsFilter);
	const { data, isLoading, error } = useGetFilmsFilteredQuery(filter);
	const dispatch = useAppDispatch();
	const setPage = (index: number) => dispatch(setCurrentPage(index));
	return (
		<div>
			<Header></Header>
			<div className="container">
				<div className={style.block}>
					<FilterBlock></FilterBlock>

					{error ? (
						<ErrorBlock text={'Не удалось загрузить'} />
					) : isLoading ? (
						<LoadingProcess />
					) : data.items.length <= 0 ? (
						<PageMessage title="По данному запросу ничего не найдено" />
					) : data ? (
						<FilmsList
							onChangePage={setPage}
							data={data.items}
							pages={data.totalPages}
						></FilmsList>
					) : null}
				</div>
			</div>
		</div>
	);
}
