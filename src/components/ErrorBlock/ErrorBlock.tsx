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
		<div className={style.block}>
			<h1 className={style.text}>{text}</h1>
			<LogoButton
				onClick={() => {
					window.location.reload();
				}}
			>
				<AiOutlineReload /> Перезагрузить
			</LogoButton>
		</div>
	);
};
