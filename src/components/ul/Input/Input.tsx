import SetClasses from '../../../util/setClasses';
import style from './input.module.css';
interface InputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {}
export const Input: React.FC<InputProps> = ({
	onClick,
	onInput,
	onChange,
	className,
	...props
}) => {
	return (
		<input
			className={SetClasses(style.input, className)}
			onClick={onClick}
			onInput={onInput}
			onChange={onChange}
			{...props}
		/>
	);
};
