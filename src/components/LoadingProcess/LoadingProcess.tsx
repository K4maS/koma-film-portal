import style from './loadingProcess.module.css';
import React from 'react';

export const LoadingProcess = () => {
	return (
		<div className={style.block}>
			<span className={style.loader}></span>
		</div>
	);
};
