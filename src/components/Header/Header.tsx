import style from './header.module.css';
import { Button } from '../ul/Button/Button';
import { Logo } from '../ul/Logo/Logo';
import { Link } from 'react-router-dom';
import { navigPaths } from '../../navigationPaths';
import SetClasses from '../../util/setClasses';

interface HeaderProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
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
								<Link key={elem.name}
									to={elem.link}
									className={SetClasses(
										style.link,
										window.location.pathname === elem.link ? style.active : ''
									)}
								>
									{elem.name}
								</Link>
							);
						})}
					</nav>
					<Button title="Войти"></Button>
				</div>
			</div>
		</header>
	);
};
