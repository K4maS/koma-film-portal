import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { createUser, doAuthorization } from '../../store/slices/Users'
import { Button } from '../ul/Button/Button'
import { Input } from '../ul/Input/Input'
import style from './registrationForm.module.css'
import { authDataType } from '../../types/userTypes'
import { Link, useNavigate } from 'react-router-dom'
import { navigPaths } from '../../navigationPaths'

export default function RegistrationForm() {
  const [loginData, setLoginData] = useState<authDataType>({
    login: '',
    password: '',
  })
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('')

  const errorMessage = useAppSelector((state) => state.users.userError)

  const usersList = useAppSelector((state) => state.users.usersList)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const getRegistration = (e: React.ChangeEvent, data: authDataType) => {
    if (!inputErrorMessage) {
      e.preventDefault()
      e.stopPropagation()
      dispatch(createUser(data))
    }
  }

  useEffect(() => {
    if (!errorMessage && !inputErrorMessage) {
      // navigate(navigPaths.login);
    }
  }, [errorMessage, inputErrorMessage])

  return (
    <form
      className={style.form}
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
        getRegistration(e, loginData)
      }
    >
      <Input
        type={'text'}
        placeholder={'Логин'}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value
          setLoginData((loginData) => ({ ...loginData, login: value }))
        }}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value
          setLoginData((loginData) => ({ ...loginData, password: value }))
        }}
      />
      <Input
        type={'password'}
        placeholder={'Повторить пароль'}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value

          if (value === loginData.password) {
            setInputErrorMessage('Пароли не совпадают')
          }
        }}
      />

      <Button title={'Зарегистрироваться'} />

      <p className={style.errorMessage}>{inputErrorMessage}</p>
      <p className={style.errorMessage}>{errorMessage}</p>
    </form>
  )
}
