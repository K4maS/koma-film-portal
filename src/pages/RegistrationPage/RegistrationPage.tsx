import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { Header } from '../../components/Header/Header';
import SetClasses from '../../util/setClasses';
import style from './registrationPage.module.css';

export default function RegistrationPage() {
	return (
		<>
			<Header />
			<div className={SetClasses('container', style.container)}>
				<RegistrationForm />
			</div>
		</>
	);
}
