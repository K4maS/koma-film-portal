import React, { useEffect, useState } from 'react';
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
import SetClasses from '../../util/setClasses';
import { LogoButton } from '../ul/LogoButton/LogoButton';

export const FilterBlock = () => {
	const dispatch = useAppDispatch();
	const stateFilterBlock = useAppSelector((state) => state.users.filmsFilter);
	const [showFilters, setShowFilters] = useState(false);

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

	const ActionOnChange = (
		e: React.ChangeEvent<HTMLInputElement> | null,
		field: keyof kpFilterType,
	) => {
		if (e === null || e.target.value === '') {
			setFilterObj((filterObj) => ({ ...filterObj, [field]: undefined }));
		} else {
			const value = (e.target as HTMLInputElement).value;
			setFilterObj((filterObj) => ({ ...filterObj, [field]: value }));
		}
	};

	const NumInputValidate = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: keyof kpFilterType,
		min = 0,
		max = 1000,
		year = false,
	) => {
		const valueStr = e.target.value;
		const value = Number(valueStr);
		if (!/^\d*$/.test(valueStr)) {
			e.preventDefault();
			return;
		}

		if (
			isNaN(value) ||
			value > max ||
			value < min ||
			valueStr.toLowerCase().includes('e')
		) {
			e.preventDefault();
			return;
		}

		ActionOnChange(e, field);
	};

	const ActionOnSelect = (
		e: React.ChangeEvent<HTMLSelectElement>,
		field: keyof kpFilterType,
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

	useEffect(() => setFilterObj(stateFilterBlock), []);

	return (
		<div className={style.filter}>
			<div className={style.filterBlock}>
				<Input
					type="search"
					value={filterObj.keyword ?? ''}
					placeholder="Поиск"
					className={style.searchInput}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						ActionOnChange(e, 'keyword');
					}}
				/>
				{showFilters && (
					<>
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
							type="text"
							value={filterObj.ratingFrom ?? ''}
							className={style.filterInput}
							placeholder="Рейтинг от (0 - 10)"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								console.log(e.target.value.toLowerCase().includes('e'));
								NumInputValidate(e, 'ratingFrom', 0, 10);
							}}
						/>
						<Input
							type="text"
							value={filterObj.ratingTo ?? ''}
							className={style.filterInput}
							placeholder="Рейтинг до (0 - 10)"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								NumInputValidate(e, 'ratingTo', 0, 10);
							}}
						/>
						<Input
							type="text"
							value={filterObj.yearFrom ?? ''}
							className={style.filterInput}
							placeholder="Год от"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								NumInputValidate(e, 'yearFrom', 0, 2999, true);
							}}
						/>
						<Input
							type="text"
							value={filterObj.yearTo ?? ''}
							className={style.filterInput}
							placeholder="Год до"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								NumInputValidate(e, 'yearTo', 0, 2999, true);
							}}
						/>

						<Button
							disabled={
								JSON.stringify(stateFilterBlock) ===
								JSON.stringify(filterExample)
							}
							title={'Сбросить фильтр'}
							onClick={() => {
								setFilterObj(filterExample);
								// setFilterObjBefore(filterExample);
								dispatch(setFilterSettings(filterExample));
							}}
						></Button>
					</>
				)}
			</div>

			<LogoButton
				className={SetClasses(
					style.showFilterBtn,
					showFilters ? style.filterActive : '',
				)}
				onClick={() => {
					setShowFilters((showFilters) => !showFilters);
				}}
			>
				{showFilters
					? 'Закрыть расширенный фильтр'
					: 'Открыть расширенный фильтр'}
			</LogoButton>
		</div>
	);
};
