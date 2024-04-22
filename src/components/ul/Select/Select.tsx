import React from 'react';
import SetClasses from '../../../util/setClasses';
import style from './select.module.css';

interface SelectProps
	extends React.DetailedHTMLProps<
		React.SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> {
	options: { name: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({
	onClick,
	onChange,
	className,
	options,
	...props
}) => {
	return (
		<select
			className={SetClasses(style.select, className)}
			onClick={onClick}
			onChange={onChange}
			{...props}
		>
			{options.map((elem) => (
				<option value={elem.value} key={elem.value}>
					{elem.name}
				</option>
			))}
		</select>
	);
};
