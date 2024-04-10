import { kpFilmType } from '../../types';
import { LogoButton } from '../ul/LogoButton/LogoButton';
import style from './filmItem.module.css';
import { BsHandThumbsUpFill } from 'react-icons/bs';

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
			<img
				className={style.poster}
				src={data.posterUrlPreview}
				alt={data.nameRu}
			/>
			<div className={style.text}>
				<h2>{data.nameRu}</h2>
				<p className={style.year}>
					{data.nameEn ? data.nameEn + ',' : ''} {data.year}
				</p>

				<p className={style.rated}>
					{data.countries[0]?.country} • {data.genres[0]?.genre}
				</p>
			</div>

			<div className={style.buttons}>
				<LogoButton>
					<BsHandThumbsUpFill className={style.logo} />
				</LogoButton>
			</div>
		</li>
	);
};
