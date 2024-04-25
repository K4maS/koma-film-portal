import style from './header.module.css';
import { Button } from '../ul/Button/Button';
import { Logo } from '../ul/Logo/Logo';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { navigPaths } from '../../navigationPaths';
import SetClasses from '../../util/setClasses';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { doUserExid } from '../../store/slices/Users';
import { User } from '../User/User';
import React from 'react';

export const Header: React.FC = ({ ...props }) => {
	const currentUserId = useAppSelector((state) => state.users.currentUserId);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const linksArr = [
		{ name: 'Все фильмы', link: navigPaths.main },
		{ name: 'Понравившиеся', link: navigPaths.liked },
	];
	return (
		<header className={style.header} {...props}>
			<div className="container">
				<div className={style.headerBlock}>
					<Logo />
					<nav className={style.nav}>
						{linksArr.map((elem) => {
							return (
								<NavLink
									key={elem.name}
									to={elem.link}
									className={SetClasses(
										style.link,
										location.pathname === elem.link ? style.active : '',
									)}
								>
									{elem.name}
								</NavLink>
							);
						})}
					</nav>
					{currentUserId === null ? (
						<div className={style.headerBtnsBlock}>
							<Button
								className={style.loginBtn}
								title="Войти"
								onClick={() => {
									navigate(navigPaths.login);
								}}
							></Button>
							<Link className={style.authLink} to={navigPaths.registriation}>
								Зарегистрироваться
							</Link>
						</div>
					) : (
						<User
							onClick={() => {
								dispatch(doUserExid());
							}}
						/>
					)}
				</div>
			</div>
		</header>
	);
};
