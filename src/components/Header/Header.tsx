import style from "./header.module.css";
import { Button } from "../ul/Button/Button";
import { Logo } from "../ul/Logo/Logo";
import { Link } from "react-router-dom";
import { navigPaths } from "../../navigationPaths";

interface HeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  return (
    <header className={style.header} {...props}>
      <div className="container">
        <div className={style.headerBlock}>
          <Logo />
          <nav className={style.nav}>
            <Link to={navigPaths.main} className={style.link}>
              Все фильмы
            </Link>
            <Link to={navigPaths.liked} className={style.link}>
              Понравившиеся
            </Link>
          </nav>
          <Button title="Войти"></Button>
        </div>
      </div>
    </header>
  );
};
