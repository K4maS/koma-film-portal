import React, { useEffect } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { navigPaths } from './navigationPaths';

import { AllFilms } from './pages/AllFimls/AllFilms';
import { LikedFilms } from './pages/LikedFimls/LikedFilms';
import { Footer } from './components/Footer/Footer';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { FilmPage } from './pages/FilmPage/FilmPage';
import { useAppDispatch } from './hooks/storeHooks';
import { updateUsers } from './store/slices/Users';


function App() {
	const dispatch = useAppDispatch();
	useEffect(()=> {
		const usersLocal = localStorage.getItem('users');
		if(usersLocal) {
			 dispatch(updateUsers(JSON.parse(usersLocal)));
		}
	}, [])
	return (
		<div className="App">
			<ErrorBoundary>
				<Routes>
					<Route path={navigPaths.main} element={<AllFilms />} />
					<Route path={navigPaths.liked} element={<LikedFilms />} />
					<Route path={`${navigPaths.card}/:id`} element={<FilmPage />} />

					<Route path={'*'} element={< NotFoundPage />} />
				</Routes>
			</ErrorBoundary>
			{/* <Footer></Footer> */}
		</div>
	);
}

export default App;
