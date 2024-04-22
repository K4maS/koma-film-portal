import React from 'react';
import SetClasses from '../../../util/setClasses';
import style from './input.module.css';

interface InputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	className?: string;
}

export const Input: React.FC<InputProps> = ({
	onClick,
	onInput,
	onChange,
	className,
	...props
}) => {
	return (
		<div className={style.inputBlock}>
			<input
				className={SetClasses(style.input, className)}
				onClick={onClick}
				onInput={onInput}
				onChange={onChange}
				{...props}
			/>
			{/* {props.type === 'password' && (
				<button
					onClick={(e) => {
						e.preventDefault();
						props.type = 'text';
					}}
					className={style.inputBtn}
				></button>
			)} */}
		</div>
	);
};
