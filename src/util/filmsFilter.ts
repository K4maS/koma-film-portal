import { kpFullFilmType } from '../types/filmTypes';
import { DividePages } from './dividePages';

export const FilmsFilter = (
	data: kpFullFilmType[],
	likedFilmsIdList: Array<number>,
): Array<kpFullFilmType[]> | [] => {
	let pageLikedFilms: Array<kpFullFilmType[]> | [] = [];

	if (data) {
		const pagedFilms = data.filter(
			(elem: kpFullFilmType): kpFullFilmType | undefined => {
				if (likedFilmsIdList && likedFilmsIdList.includes(elem.kinopoiskId)) {
					return elem;
				}
			},
		);
		pageLikedFilms = DividePages(pagedFilms);
	}

	return pageLikedFilms;
};
