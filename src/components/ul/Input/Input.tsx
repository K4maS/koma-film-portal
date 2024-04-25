import React, { useState } from 'react';
import SetClasses from '../../../util/setClasses';
import style from './input.module.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface InputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	inputType?: string;
	className?: string;
}

export const Input: React.FC<InputProps> = ({
	onClick,
	onInput,
	onChange,
	// onShowPassword,
	className,
	inputType,
	...props
}) => {
	const [passwordPoolType, setPasswordPoolType] = useState<string | undefined>(
		inputType,
	);

	const doChangeType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (passwordPoolType === 'password') {
			setPasswordPoolType('text');
		} else {
			setPasswordPoolType('password');
		}
	};

	return (
		<div className={style.inputBlock}>
			<input
				className={SetClasses(style.input, className)}
				onClick={onClick}
				onInput={onInput}
				onChange={onChange}
				type={passwordPoolType}
				{...props}
			/>
			{inputType === 'password' && (
				<button
					onClick={(e) => {
						doChangeType(e);
					}}
					className={style.eyeBtn}
				>
					{passwordPoolType === 'password' ? <FaRegEye /> : <FaRegEyeSlash />}
				</button>
			)}
		</div>
	);
};
