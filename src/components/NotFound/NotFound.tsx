import React from 'react';
import style from './notFound.module.css';

export const NotFound = () => {
	return (
		<div className={style.notFound}>
			<h1 className={style.text}>Вы перешли по несуществующей сслыке!</h1>
		</div>
	);
};
