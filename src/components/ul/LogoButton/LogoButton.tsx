import SetClasses from '../../../util/setClasses';
import style from './logoButton.module.css';
interface LogoButtonProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}
	
export const LogoButton: React.FC<LogoButtonProps> = ({ children, className, onClick }) => {
	return <button className={SetClasses(style.btn, className)} onClick={onClick}>{children}</button>;
};
