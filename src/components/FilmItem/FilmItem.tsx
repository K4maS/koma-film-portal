import { Link, useNavigate } from 'react-router-dom';
import { kpFullFilmType } from '../../types/filmTypes';
import { LogoButton } from '../ul/LogoButton/LogoButton';
import style from './filmItem.module.css';
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from 'react-icons/bs';
import { navigPaths } from '../../navigationPaths';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addLikedFilm, removeFilmFromLiked } from '../../store/slices/Users';
import { useEffect, useState } from 'react';

interface FilmItemType
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	data: kpFullFilmType;
}

export const FilmItem: React.FC<FilmItemType> = ({ data }) => {
	const dispatch = useAppDispatch();
	const [inLikedList, setInLikedList] = useState(false);
	const currentUserId = useAppSelector((state) => state.users.currentUserId);

	const navigate = useNavigate();

	const likedFilmsIdList = useAppSelector((state) => {
		if (currentUserId !== null) {
			return state.users.usersList[currentUserId]?.likedFilmsId;
		}
	});
	useEffect(() => {
		if (likedFilmsIdList) {
			if (likedFilmsIdList.includes(data.kinopoiskId)) {
				setInLikedList(true);
			} else {
				setInLikedList(false);
			}
		}
	}, [likedFilmsIdList]);

	return (
		<li className={style.item}>
			<Link
				className={style.link}
				to={`${navigPaths.card}/${data.kinopoiskId}`}
			>
				<img
					className={style.poster}
					src={data.posterUrlPreview}
					alt={
						data.nameRu
							? data.nameRu
							: data.nameEn
							? data.nameEn
							: data.nameOriginal!
					}
				/>
				<div className={style.block}>
					<h2>
						{data.nameRu
							? data.nameRu
							: data.nameEn
							? data.nameEn
							: data.nameOriginal!}
					</h2>
					<p className={style.year}>
						{data.nameEn ? data.nameEn + ',' : ''} {data.year}
					</p>
					<p className={style.rated}>
						{data.countries[0]?.country} • {data.genres[0]?.genre}
					</p>
				</div>
				<div className={style.buttons}>
					<LogoButton className={style.btn}>Подробнее</LogoButton>
					{!inLikedList ? (
						<LogoButton
							className={style.btnLike}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();

								if (currentUserId !== null) {
									dispatch(addLikedFilm({ film: data }));
								} else {
									navigate(navigPaths.login);
								}
							}}
						>
							<BsHandThumbsUpFill /> Лайк
						</LogoButton>
					) : (
						<LogoButton
							className={style.btnLike}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								dispatch(removeFilmFromLiked({ id: data.kinopoiskId }));
							}}
							active
						>
							<BsHandThumbsDownFill /> Дизлайк
						</LogoButton>
					)}
				</div>
			</Link>
		</li>
	);
};
