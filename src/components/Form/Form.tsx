import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { doAuthorization } from '../../store/slices/Users';
import { Button } from '../ul/Button/Button';
import { Input } from '../ul/Input/Input';
import style from './form.module.css';
import { authDataType } from '../../types/userTypes';
import { Link, useNavigate } from 'react-router-dom';
import { navigPaths } from '../../navigationPaths';

export default function Form() {
	const [liginData, setLoginData] = useState<authDataType>({
		login: '',
		password: '',
	});
	const userId = useAppSelector((state) => state.users.currentUserId);
	const errorMessage = useAppSelector((state) => state.users.userError);
	const usersList = useAppSelector((state) => state.users.usersList);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const getAuthorization = (e: React.ChangeEvent, data: authDataType) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(doAuthorization(data));
	};

	useEffect(() => {
		console.log(userId, errorMessage);
		const currendUser = usersList.find(
			(elem) => elem.login === liginData.login
		);

		if (userId === currendUser?.id && !errorMessage) {
			navigate(navigPaths.main);
		}
	}, [userId]);

	return (
		<form
			className={style.form}
			onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
				getAuthorization(e, liginData)
			}
		>
			<Input
				type={'text'}
				placeholder={'Логин'}
				onInput={(e) => {
					const value = (e.target as HTMLInputElement).value;
					setLoginData((liginData) => ({ ...liginData, login: value }));
				}}
			/>
			<Input
				type={'password'}
				placeholder={'Пароль'}
				onInput={(e) => {
					const value = (e.target as HTMLInputElement).value;
					setLoginData((liginData) => ({ ...liginData, password: value }));
				}}
			/>

			<Button title={'Войти'} />
			<Link to={navigPaths.registriation}>Заерегистрироваться</Link>
			<p className="errorMessage">{errorMessage}</p>
		</form>
	);
}
