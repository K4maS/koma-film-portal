import React, { useEffect, useState } from 'react';
import SetClasses from '../../../util/setClasses';
import style from './paginationBtn.module.css';

interface PaginationBtnProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	index: number;
	active: boolean;
}

export const PaginationBtn: React.FC<PaginationBtnProps> = ({
	index,
	active,
	onClick,
}) => {
	const [activeBtn, setActiveBtn] = useState('');

	useEffect(() => {
		if (active) {
			setActiveBtn(style.active);
		} else {
			setActiveBtn('');
		}
	}, [active]);

	return (
		<button
			onClick={onClick}
			className={SetClasses(style.paginatinBtn, activeBtn)}
		>
			{index}
		</button>
	);
};
