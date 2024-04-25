import React from 'react';
import MessageBlock from '../MessageBlock/MessageBlock';
import { LogoButton } from '../ul/LogoButton/LogoButton';
import style from './errorBlock.module.css';
import { AiOutlineReload } from 'react-icons/ai';

interface ErrorBlockType
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	text: string;
}

export const ErrorBlock: React.FC<ErrorBlockType> = ({ text }) => {
	return (
		<MessageBlock className={style.block} title={text}>
			<LogoButton
				onClick={() => {
					window.location.reload();
				}}
			>
				<AiOutlineReload /> Перезагрузить
			</LogoButton>
		</MessageBlock>
	);
};
