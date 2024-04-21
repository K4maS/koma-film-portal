import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks'
import SetClasses from '../../../util/setClasses'
import style from './user.module.css'
import { GetIndexOfUserById } from '../../../util/getIndexOfUserById'
import React, { useEffect } from 'react'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string
}

export const User: React.FC<ButtonProps> = ({
  title,
  onClick,
  className,
  ...props
}) => {
  const dispatch = useAppDispatch()
  const currentUserId = useAppSelector((state) => state.users.currentUserId)
  const usersList = useAppSelector((state) => state.users.usersList)

  const navigate = useNavigate()

  const currentUser = useAppSelector((state) => {
    if (currentUserId !== null) {
      const index = GetIndexOfUserById(usersList, currentUserId)

      return state.users.usersList[index]
    }
  })

  return (
    <button
      className={SetClasses(style.btnUser, className)}
      onClick={onClick}
      {...props}
    >
      <div className={style.userAva}>{currentUser?.login[0]}</div>
      {currentUser?.login}
    </button>
  )
}
