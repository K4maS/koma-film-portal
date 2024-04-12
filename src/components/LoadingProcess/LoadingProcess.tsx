import style from './loadingProcess.module.css';

export const LoadingProcess = () => {
	return (
		<div className={style.block}>
			<span className={style.loader}></span>
		</div>
	);
};
