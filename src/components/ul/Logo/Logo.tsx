import { Link } from "react-router-dom";
import style from "./logo.module.css";

import { BsFilm } from "react-icons/bs";
import { navigPaths } from "../../../navigationPaths";
export const Logo = () => {
  return (
    <Link to={navigPaths.main} className={style.logo}>
      <BsFilm />
      <div className="logo">komaFilms</div>
    </Link>
  );
};
