import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { navigPaths } from './navigationPaths';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { useAppDispatch } from './hooks/storeHooks';
import {
	updateCurrentUserId,
	updateLikedFilmsList,
	updateUsers,
} from './store/slices/Users';
import { LoadingProcess } from './components/LoadingProcess/LoadingProcess';
import { useTheme } from './hooks/useTheme';
import { AppContextProvider } from './contextAPI/AppContext/AppContextProvider';
import { Header } from './components/Header/Header';

const LazyAuthPage = React.lazy(() => import('./pages/AuthPage/AuthPage'));
const LazyRegistrationPage = React.lazy(
	() => import('./pages/RegistrationPage/RegistrationPage'),
);
const LazyNotFoundPage = React.lazy(
	() => import('./pages/NotFoundPage/NotFoundPage'),
);
const LazyAllFilms = React.lazy(() => import('./pages/AllFilms/AllFilms'));
const LazyFilmPage = React.lazy(() => import('./pages/FilmPage/FilmPage'));
const LazyLikedFilms = React.lazy(
	() => import('./pages/LikedFilms/LikedFilms'),
);

function App() {
	const dispatch = useAppDispatch();

	const { setTheme } = useTheme();

	useLayoutEffect(() => {
		const themeLocal = localStorage.getItem('colorTheme');
		if (themeLocal) {
			const theme = JSON.parse(themeLocal);
			if (theme === 'dark' || theme === 'ligth') {
				setTheme(theme);
			}
		}
	}, []);

	useEffect(() => {
		const usersLocal = localStorage.getItem('users');
		const currentUserIdLocal = localStorage.getItem('currentUserId');
		const likedFilmaLocal = localStorage.getItem('likedFilms');

		if (usersLocal) {
			dispatch(updateUsers(JSON.parse(usersLocal)));
		}

		if (currentUserIdLocal) {
			dispatch(updateCurrentUserId(JSON.parse(currentUserIdLocal)));
		}

		if (likedFilmaLocal) {
			dispatch(updateLikedFilmsList(JSON.parse(likedFilmaLocal)));
		}
	}, []);

	return (
		<div className="App">
			<ErrorBoundary>
				<Header></Header>
				<Routes>
					<Route
						path={navigPaths.login}
						element={
							<Suspense fallback={<LoadingProcess />}>
								<LazyAuthPage />
							</Suspense>
						}
					/>
					<Route
						path={navigPaths.registriation}
						element={
							<Suspense fallback={<LoadingProcess />}>
								<LazyRegistrationPage />
							</Suspense>
						}
					/>

					<Route
						path={navigPaths.liked}
						element={
							<Suspense fallback={<LoadingProcess />}>
								<AppContextProvider>
									<LazyLikedFilms />
								</AppContextProvider>
							</Suspense>
						}
					/>
					<Route
						path={`${navigPaths.card}/:id`}
						element={
							<Suspense fallback={<LoadingProcess />}>
								<LazyFilmPage />
							</Suspense>
						}
					/>
					<Route
						path={navigPaths.main}
						element={
							<Suspense fallback={<LoadingProcess />}>
								<LazyAllFilms />
							</Suspense>
						}
					/>
					<Route
						path={'*'}
						element={
							<Suspense fallback={<LoadingProcess />}>
								<LazyNotFoundPage />
							</Suspense>
						}
					/>
				</Routes>
			</ErrorBoundary>
		</div>
	);
}

export default App;
