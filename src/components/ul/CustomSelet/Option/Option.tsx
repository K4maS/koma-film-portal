import style from './option.module.css';

import { MouseEventHandler } from 'react';
type Option = { name: string; value: string };
type OptionProps = {
	option: Option;
	onClick: (value: Option['value']) => void;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, name },
		onClick,
	} = props;

	const handleClick =
		(clickedValue: Option['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<li
			className={style.option}
			value={value}
			onClick={handleClick(value)}
			tabIndex={0}
		>
			{name}
		</li>
	);
};
