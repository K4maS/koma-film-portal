import { useLayoutEffect } from 'react';
import { setColorTheme } from '../store/slices/Users';
import { useAppDispatch, useAppSelector } from './storeHooks';
import { colorThemeType } from '../types/userTypes';

export const useTheme = () => {
	const colorTheme = useAppSelector((state) => state.users.colorTheme);
	const dispatch = useAppDispatch();

	const setTheme = (theme: colorThemeType) => {
		dispatch(setColorTheme(theme));
	};

	const setThemeBinar = () => {
		if (colorTheme === 'dark') {
			setTheme('ligth');
		} else if (colorTheme === 'ligth') {
			setTheme('dark');
		}
	};

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', colorTheme);
	}, [colorTheme, setTheme]);

	return { theme: colorTheme, setTheme, setThemeBinar };
};
