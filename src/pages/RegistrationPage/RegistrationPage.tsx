import Form from '../../components/Form/Form';
import { Header } from '../../components/Header/Header';
import SetClasses from '../../util/setClasses';
import style from './registrationPage.module.css';

export default function RegistrationPage() {
	return (
		<>
			<Header />
			<div className={SetClasses('container', style.container)}>
				<Form />
			</div>
		</>
	);
}
