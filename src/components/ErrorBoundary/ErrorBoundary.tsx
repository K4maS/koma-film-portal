import React, { ErrorInfo, ReactNode } from 'react';
import style from './errorBoundary.module.css';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		// Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
		logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return (
				<div className={style.block}>
					<h1>Что-то пошло не так.</h1>
				</div>
			);
		}

		return this.props.children;
	}
}

function logErrorToMyService(error: Error, errorInfo: ErrorInfo) {
	// Реализация сохранения информации об ошибке в службу журнала ошибок
	console.error('Error occurred:', error);
	console.error('Error info:', errorInfo);
}
