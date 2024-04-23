/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styles from './Switch.module.css';

interface SwitchType
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	checked: boolean;
}
export const Switch: React.FC<SwitchType> = ({
	children,
	onClick,
	checked = false,
}) => {
	return (
		<div className={styles.switch} onClick={onClick}>
			<input className={styles.check} type="checkbox" checked={checked} />
			{children}
		</div>
	);
};
