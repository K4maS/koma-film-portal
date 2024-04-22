import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import SetClasses from '../../../util/setClasses';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Option } from './Option/Option';
import style from './customSelect.module.css';

type Option = { name: string; value: string };

type SelectProps = {
	value: Option | null;
	options: Option[];
	placeholder?: string;
	mode?: 'rows' | 'cells';
	status?: 'default' | 'invalid';
	onChange?: (value: Option['value']) => void;
	onClose?: () => void;
};

export const CustomSelect = (props: SelectProps) => {
	const {
		mode = 'rows',
		options,
		placeholder,
		status = 'default',
		value,
		onChange,
		onClose,
	} = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				setIsOpen(false);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen, onClose]);

	const handleOptionClick = (value: Option['value']) => {
		setIsOpen(false);
		onChange?.(value);
	};
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div
			className={style.selectWrapper}
			ref={rootRef}
			data-is-active={isOpen}
			data-mode={mode}
		>
			<div className={style.arrow}>
				<IoMdArrowDropdown />
			</div>
			<div
				className={style.placeholder}
				data-status={status}
				data-value={!!value?.value}
				onClick={handlePlaceHolderClick}
				role="button"
				tabIndex={0}
			>
				{value?.name || placeholder}
			</div>
			{isOpen && (
				<ul className={style.select}>
					{options.map((option) => (
						<Option
							key={option.value}
							option={option}
							onClick={handleOptionClick}
						/>
					))}
				</ul>
			)}
		</div>
	);
};
