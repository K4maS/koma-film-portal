import { useState } from 'react';
import { kpFilmType } from '../../types';
import { FilmItem } from '../FilmItem/FilmItem';
import style from './filmsList.module.css';
import { DividePages } from '../../util/dividePages';

interface FilmsListType
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	data: [kpFilmType];
}

export const FilmsList: React.FC<FilmsListType> = ({ data }) => {
	const [page, setPage] = useState(0);

	const pagedData = DividePages(data);
	return (
		<div>
			<ul className={style.list}>
				{pagedData[page].map((elem: kpFilmType) => {
					return <FilmItem data={elem}></FilmItem>;
				})}
			</ul>
			<ul className={style.pagination}>
				{pagedData.map((elem, index) => {
					return (
						<li className={style.paginationItem}>
							<button className={style.paginatinBtn} onClick={()=>setPage(index)}>{index + 1}</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
