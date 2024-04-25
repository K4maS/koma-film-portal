import React from 'react';
import Form from '../../components/Form/Form';
import SetClasses from '../../util/setClasses';
import style from './authPage.module.css';

export default function AuthPage() {
	return (
		<div className={SetClasses('container', style.container)}>
			<Form />
		</div>
	);
}
