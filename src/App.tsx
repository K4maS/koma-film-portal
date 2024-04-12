import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { navigPaths } from './navigationPaths';

import { AllFilms } from './pages/AllFimls/AllFilms';
import { LikedFilms } from './pages/LikedFimls/LikedFilms';
import { Footer } from './components/Footer/Footer';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { FilmPage } from './pages/FilmPage/FilmPage';

function App() {
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
