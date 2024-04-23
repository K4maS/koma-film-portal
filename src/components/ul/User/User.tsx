import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import SetClasses from '../../../util/setClasses';
import style from './user.module.css';
import { GetIndexOfUserById } from '../../../util/getIndexOfUserById';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { LogoButton } from '../LogoButton/LogoButton';
import { MdClose } from 'react-icons/md';
import { RxExit } from 'react-icons/rx';
import { useTheme } from '../../../hooks/useTheme';
import { Switch } from '../Switch';

interface ButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	title?: string;
}

export const User: React.FC<ButtonProps> = ({
	title,
	onClick,
	className,
	...props
}) => {
	const dispatch = useAppDispatch();
	const currentUserId = useAppSelector((state) => state.users.currentUserId);
	const usersList = useAppSelector((state) => state.users.usersList);
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const { theme, setThemeBinar } = useTheme();

	const currentUser = useAppSelector((state) => {
		if (currentUserId !== null) {
			const index = GetIndexOfUserById(usersList, currentUserId);
			const user = JSON.parse(JSON.stringify(state.users.usersList[index]));
			if (user?.login?.length < 1) {
				user.login = 'Unknown';
			}
			return user;
		}
	});

	useEffect(() => {
		if (!menuIsOpen) {
			return;
		}

		const handleClick = (e: MouseEvent) => {
			const { target } = e;

			if (!menuRef.current) {
				return;
			}

			if (!(target instanceof Element) || !menuRef.current.contains(target)) {
				setMenuIsOpen(false);
			}
		};

		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [menuIsOpen, setMenuIsOpen]);

	return (
		<div ref={menuRef} className={style.userBlock}>
			<button
				className={SetClasses(style.btnUser, className)}
				onClick={() => {
					setMenuIsOpen((menuIsOpen) => !menuIsOpen);
				}}
				{...props}
			>
				<div className={style.userAva}>
					{currentUser?.login[0].toUpperCase()}
				</div>
				<span className={style.userName}>{currentUser?.login}</span>
			</button>
			{menuIsOpen && (
				<div className={SetClasses(style.menu, menuIsOpen ? style.open : '')}>
					<button
						className={style.closeBtn}
						onClick={() => {
							setMenuIsOpen(false);
						}}
					>
						x
					</button>
					<span className={style.menuName}>{currentUser?.login}</span>
					<div className={style.themeBlock}>
						<span className={style.themeText}>Ночная тема:</span>
						<Switch
							className={style.theme}
							checked={'ligth' === theme}
							onClick={() => {
								setThemeBinar();
							}}
						></Switch>
					</div>
					<LogoButton className={style.exitBtn} onClick={onClick}>
						<RxExit />
						Выход
					</LogoButton>
				</div>
			)}
		</div>
	);
};
