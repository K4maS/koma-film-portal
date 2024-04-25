import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
	createUser,
	doAuthorization,
	setErrorMessage,
} from '../../store/slices/Users';
import { Button } from '../ul/Button/Button';
import { Input } from '../ul/Input/Input';
import style from './registrationForm.module.css';
import { authDataType } from '../../types/userTypes';
import { Link, useNavigate } from 'react-router-dom';
import { navigPaths } from '../../navigationPaths';

export default function RegistrationForm() {
	const [loginData, setLoginData] = useState<authDataType>({
		login: '',
		password: '',
	});
	const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
	const [repeatPassword, setRepeatPassword] = useState<string>('');

	const errorMessage = useAppSelector((state) => state.users.userError);

	const usersList = useAppSelector((state) => state.users.usersList);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const getRegistration = (e: React.ChangeEvent, data: authDataType) => {
		if (repeatPassword === loginData.password) {
			e.preventDefault();
			e.stopPropagation();
			dispatch(createUser(data));
		}
	};

	useEffect(() => {
		dispatch(setErrorMessage(null));
	}, []);

	useEffect(() => {
		const registratedUser = usersList.find(
			(elem) =>
				elem.login === loginData.login && elem.password === loginData.password,
		);

		if (registratedUser && !errorMessage) {
			navigate(navigPaths.login);
		}
	}, [usersList, errorMessage, inputErrorMessage]);

	return (
		<form
			className={style.form}
			onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
				getRegistration(e, loginData);
			}}
		>
			<h1 className={style.title}>Регистрация</h1>

			<Input
				inputType={'text'}
				placeholder={'Логин'}
				onInput={(e) => {
					const value = (e.target as HTMLInputElement).value;
					setLoginData((loginData) => ({ ...loginData, login: value }));
				}}
			/>
			<Input
				inputType={'password'}
				placeholder={'Пароль'}
				onInput={(e) => {
					const value = (e.target as HTMLInputElement).value;
					setLoginData((loginData) => ({ ...loginData, password: value }));
				}}
			/>
			<Input
				inputType={'password'}
				placeholder={'Повторить пароль'}
				onInput={(e) => {
					const value = (e.target as HTMLInputElement).value;
					setRepeatPassword(value);
					if (value !== loginData.password) {
						setInputErrorMessage('Пароли не совпадают');
					} else {
						setInputErrorMessage('');
					}
				}}
			/>

			<Button title={'Зарегистрироваться'} />

			<p className={style.errorMessage}>{inputErrorMessage}</p>
			<p className={style.errorMessage}>{errorMessage}</p>
		</form>
	);
}
