import { Link } from 'react-router-dom';
import { kpFilmType } from '../../types';
import { LogoButton } from '../ul/LogoButton/LogoButton';
import style from './filmItem.module.css';
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { navigPaths } from '../../navigationPaths';

interface FilmItemType
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	data: kpFilmType;
}

export const FilmItem: React.FC<FilmItemType> = ({ data }) => {
	return (
		<li className={style.item}>
			<Link
				className={style.link}
				to={`${navigPaths.card}/${data.kinopoiskId}`}
			>
				<img
					className={style.poster}
					src={data.posterUrlPreview}
					alt={data.nameRu}
				/>
				<div className={style.block}>
					<h2>{data.nameRu}</h2>
					<p className={style.year}>
						{data.nameEn ? data.nameEn + ',' : ''} {data.year}
					</p>
					<p className={style.rated}>
						{data.countries[0]?.country} • {data.genres[0]?.genre}
					</p>
				</div>
				<div className={style.buttons}>
					<LogoButton className={style.btn}>Подробнее</LogoButton>
					<LogoButton
						className={style.btnLike}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<BsHandThumbsUpFill /> Лайк
					</LogoButton>
				</div>
			</Link>
		</li>
	);
};
