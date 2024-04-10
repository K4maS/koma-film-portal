import style from './logoButton.module.css';
interface LogoButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}
export const LogoButton: React.FC<LogoButtonProps> = ({ children }) => {
	return <button className={style.btn}>{children}</button>;
};
