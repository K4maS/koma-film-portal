import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { addLikedFilm, removeFilmFromLiked } from '../../store/slices/Users'
import { kpFullFilmType } from '../../types/filmTypes'
import SetClasses from '../../util/setClasses'
import { LogoButton } from '../ul/LogoButton/LogoButton'
import style from './filmCard.module.css'
import { useNavigate } from 'react-router-dom'
import { navigPaths } from '../../navigationPaths'
import { GetIndexOfUserById } from '../../util/getIndexOfUserById'

interface FilmCardType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  data: kpFullFilmType
}

export const FilmCard: React.FC<FilmCardType> = ({ data }) => {
  const dispatch = useAppDispatch()
  const [inLikedList, setInLikedList] = useState(false)
  const currentUserId = useAppSelector((state) => state.users.currentUserId)
  const usersList = useAppSelector((state) => state.users.usersList)

  const navigate = useNavigate()

  const likedFilmsIdList = useAppSelector((state) => {
    if (currentUserId !== null) {
      const index = GetIndexOfUserById(usersList, currentUserId)

      return state.users.usersList[index]?.likedFilmsId
    }
  })
  useEffect(() => {
    if (likedFilmsIdList) {
      if (likedFilmsIdList.includes(data.kinopoiskId)) {
        setInLikedList(true)
      } else {
        setInLikedList(false)
      }
    }
  }, [likedFilmsIdList])

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
              {data.nameRu ? data.nameRu : data.nameOriginal} ({data.year})
            </h2>

            <p className={style.year}>
              {data.nameOriginal && data.nameRu ? data.nameOriginal + ',' : ''}
              {data.ratingAgeLimits
                ? ` ${data.ratingAgeLimits.slice(3)}+`
                : data.ratingAgeLimits}
            </p>

            <p className={style.rated}>
              {data.countries[0]?.country} • {data.genres[0]?.genre}
            </p>
          </div>
          <div className={style.buttons}>
            {!inLikedList ? (
              <LogoButton
                onClick={() => {
                  if (currentUserId !== null) {
                    dispatch(addLikedFilm({ film: data }))
                  } else {
                    navigate(navigPaths.login)
                  }
                }}
              >
                Добавить в понравившиеся
              </LogoButton>
            ) : (
              <LogoButton
                onClick={() =>
                  dispatch(removeFilmFromLiked({ id: data.kinopoiskId }))
                }
                active
              >
                Удалить из понравившихся
              </LogoButton>
            )}
          </div>
        </div>

        <table className={style.filmTable}>
          <tbody>
            <tr className={style.tableRow}>
              <td className={SetClasses(style.label, style.top)}>
                Продолжительность:
              </td>
              <td className={SetClasses(style.value, style.top)}>
                {data.filmLength} мин.
              </td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.label}>Слоган:</td>
              <td className={style.value}>{data.slogan ? data.slogan : '-'}</td>
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
              <td className={style.value}>{data.ratingKinopoisk || '-'}</td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.label}>Рейтинг IMDB:</td>
              <td className={style.value}>{data.ratingImdb || '-'}</td>
            </tr>
            <tr className={style.tableRow}>
              <td className={style.label}>Количество отзывов на Кинопоиске:</td>
              <td className={style.value}>{data.reviewsCount || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
