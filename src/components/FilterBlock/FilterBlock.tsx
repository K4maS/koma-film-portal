import { useEffect, useState } from 'react';
import {
	kpFilterOrderType,
	kpFilterType,
	kpFilterTypeType,
} from '../../types/filmTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { filterExample, setFilterSettings } from '../../store/slices/Users';
import style from './filterBlock.module.css';
import { Input } from '../ul/Input/Input';
import { Select } from '../ul/Select/Select';
import { Button } from '../ul/Button/Button';
import useDebounce from '../../hooks/debounceHook';

export const FilterBlock = () => {
	const dispatch = useAppDispatch();
	const stateFilterBlock = useAppSelector((state) => state.users.filmsFilter);

	const [filterObj, setFilterObj] = useState<kpFilterType>(filterExample);
	const [filterObjBefore, setFilterObjBefore] =
		useState<kpFilterType>(filterExample);

	const debounceValue = useDebounce(filterObj, 500);

	const filterOrder: { name: string; value: kpFilterOrderType }[] = [
		{ name: 'Количество отзывов', value: 'NUM_VOTE' },
		{ name: 'Рейтинг', value: 'RATING' },
		{ name: 'Год', value: 'YEAR' },
	];
	const FilterType: { name: string; value: kpFilterTypeType }[] = [
		{ name: 'Все', value: 'ALL' },
		{ name: 'Фильмы', value: 'FILM' },
		{ name: 'Мини сериалы', value: 'MINI_SERIES' },
		{ name: 'Теле-сериалы', value: 'TV_SERIES' },
		{ name: 'Теле-шоу', value: 'TV_SHOW' },
	];

	const ActionOnInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof kpFilterType
	) => {
		const value = (e.target as HTMLInputElement).value;
		setFilterObj((filterObj) => ({ ...filterObj, [field]: value }));
	};

	const ActionOnSelect = (
		e: React.ChangeEvent<HTMLSelectElement>,
		field: keyof kpFilterType
	) => {
		const value = (e.target as HTMLSelectElement).value;
		if (
			['RATING', 'NUM_VOTE', 'YEAR'].includes(value) ||
			['ALL', 'FILM', 'TV_SHOW', 'TV_SERIES', 'MINI_SERIES'].includes(value)
		)
			setFilterObj((filterObj) => ({ ...filterObj, [field]: value }));
	};

	useEffect(() => {
		if (JSON.stringify(debounceValue) !== JSON.stringify(filterObjBefore)) {
			dispatch(setFilterSettings(filterObj));
			setFilterObjBefore(filterObj);
		}
	}, [debounceValue]);

	return (
		<div className={style.filterBlock}>
			<Input
				type="text"
				value={filterObj.keyword ?? ''}
				placeholder="Поиск"
				className={style.filterInput}
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
					ActionOnInput(e, 'keyword');
				}}
			/>
			<Select
				options={filterOrder}
				value={filterObj.order ?? ''}
				onChange={(e) => {
					ActionOnSelect(e, 'order');
				}}
			></Select>
			<Select
				value={filterObj.type ?? ''}
				options={FilterType}
				onChange={(e) => {
					ActionOnSelect(e, 'type');
				}}
			></Select>

			<Input
				type="number"
				value={filterObj.ratingFrom ?? ''}
				className={style.filterInput}
				placeholder="Рейтинг от"
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
					ActionOnInput(e, 'ratingFrom');
				}}
			/>
			<Input
				type="number"
				value={filterObj.ratingTo ?? ''}
				className={style.filterInput}
				placeholder="Рейтинг до"
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
					ActionOnInput(e, 'ratingTo');
				}}
			/>
			<Input
				type="number"
				value={filterObj.yearFrom ?? ''}
				className={style.filterInput}
				placeholder="Год от"
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
					ActionOnInput(e, 'yearFrom');
				}}
			/>
			<Input
				type="number"
				value={filterObj.yearTo ?? ''}
				className={style.filterInput}
				placeholder="Год до"
				onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
					ActionOnInput(e, 'yearTo');
				}}
			/>

			<Button
				disabled={
					JSON.stringify(stateFilterBlock) === JSON.stringify(filterExample)
				}
				title={'Сбросить фильтр'}
				onClick={() => {
					setFilterObj(filterExample);
					dispatch(setFilterSettings(filterExample));
				}}
			></Button>
		</div>
	);
};
