import { kpFullFilmType } from '../../types/filmTypes';
import { FilmItem } from '../FilmItem/FilmItem';
import style from './filmsList.module.css';
import { PaginationBtn } from '../ul/PaginationBtn/PaginationBtn';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setCurrentPage } from '../../store/slices/Users';

interface FilmsListType
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	data: kpFullFilmType[];
	pages?: number;
}

export const FilmsList: React.FC<FilmsListType> = ({ data, pages }) => {
	const page = useAppSelector((state) => state.users.filmsFilter.page);
	const dispatch = useAppDispatch();

	return (
		<div>
			<ul className={style.list}>
				{data.map((elem: kpFullFilmType) => {
					return <FilmItem data={elem} key={elem.kinopoiskId}></FilmItem>;
				})}
			</ul>
			{pages && pages > 1 && (
				<ul className={style.pagination}>
					{pages &&
						Array.from({ length: pages - 1 }).map((elem, index) => {
							index = index + 1;
							return (
								<li className={style.paginationItem} key={index}>
									<PaginationBtn
										onClick={() => dispatch(setCurrentPage(index))}
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
