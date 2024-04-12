import { kpFullFilmType } from '../../types';
import SetClasses from '../../util/setClasses';
import { LogoButton } from '../ul/LogoButton/LogoButton';
import style from './filmCard.module.css';

interface FilmCardType
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	data: kpFullFilmType;
}

export const FilmCard: React.FC<FilmCardType> = ({ data }) => {
	return (
		<div className={style.block}>
			<div className={style.leftBlock}>
				<img className={style.poster} src={data.posterUrl} alt={data.nameRu} />
				<div className={style.leftBottomBlock}></div>
			</div>
			<div className={style.rightBlock}>
				<div className={style.rightBlockTop}>
					<div className={style.text}>
						<h2 className={style.title}>
							{data.nameRu} ({data.year})
						</h2>

						<p className={style.year}>
							{data.nameOriginal ? data.nameOriginal + ',' : ''} 
							{data.ratingAgeLimits.slice(3)}+
						</p>

						<p className={style.rated}>
							{data.countries[0]?.country} • {data.genres[0]?.genre}
						</p>
					</div>
					<div className={style.buttons}>
						<LogoButton >
							Добавить в понравившиеся
						</LogoButton>
					</div>
				</div>

				<table className={style.filmTable}>
					<tbody>
						<tr className={style.tableRow}>
							<td className={SetClasses(style.label, style.top)}>Продолжительность:</td>
							<td className={SetClasses(style.value, style.top)}>{data.filmLength} мин.</td>
						</tr>
						<tr className={style.tableRow}>
							<td className={style.label}>Слоган:</td>
							<td className={style.value}>{data.slogan? data.slogan : '-'}</td>
						</tr>
						<tr className={style.tableRow}>
							<td className={style.label}>Описание:</td>
							<td className={style.value}>{data.description}</td>
						</tr>
						<tr className={style.tableRow}>
							<td className={style.label}>Страна:</td>
							<td className={style.value}>
								{data.countries
									? data.countries.map((country) => country.country).join(', ')
									: '-'}
							</td>
						</tr>
						<tr className={style.tableRow}>
							<td className={style.label}>Жанр:</td>
							<td className={style.value}>
								{data.genres
									? data.genres.map((genre) => genre.genre).join(', ')
									: '-'}
							</td>
						</tr>
						<tr className={style.tableRow}>
							<td className={style.label}>Рейтинг Кинопоиска:</td>
							<td className={style.value}>
								{data.ratingKinopoisk || '-'}
							</td>
						</tr>
						<tr className={style.tableRow}>
							<td className={style.label}>Рейтинг IMDB:</td>
							<td className={style.value}>{data.ratingImdb || '-'}</td>
						</tr>
						<tr className={style.tableRow}>
							<td className={style.label}>Количество отзывов на Кинопоиске:</td>
							<td className={style.value}>
								{data.reviewsCount || '-'}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};
