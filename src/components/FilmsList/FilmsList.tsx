import { useState } from 'react';
import { kpFilmType } from '../../types';
import { FilmItem } from '../FilmItem/FilmItem';
import style from './filmsList.module.css';
import { DividePages } from '../../util/dividePages';
import { PaginationBtn } from '../ul/PaginationBtn/PaginationBtn';

interface FilmsListType
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	data: kpFilmType[];
}

export const FilmsList: React.FC<FilmsListType> = ({ data }) => {
	const [page, setPage] = useState(0);
	const pagedData = DividePages(data, 10);
	return (
		<div>
			<ul className={style.list}>
				{pagedData[page].map((elem: kpFilmType) => {
					return <FilmItem data={elem} key={elem.kinopoiskId}></FilmItem>;
				})}
			</ul>
			{pagedData.length > 1 && (
				<ul className={style.pagination}>
					{pagedData.map((elem, index) => {
						return (
							<li className={style.paginationItem} key={index}>
								<PaginationBtn
									onClick={() => setPage(index)}
									index={index}
									active={index === page}
								></PaginationBtn>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
