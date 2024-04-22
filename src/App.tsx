import React, { useEffect } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import { navigPaths } from './navigationPaths'

import { AllFilms } from './pages/AllFimls/AllFilms'
import { LikedFilms } from './pages/LikedFimls/LikedFilms'
import { Footer } from './components/Footer/Footer'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { FilmPage } from './pages/FilmPage/FilmPage'
import { useAppDispatch } from './hooks/storeHooks'
import {
  updateCurrentUserId,
  updateLikedFilmsList,
  updateUsers,
} from './store/slices/Users'
import AuthPage from './pages/AuthPage/AuthPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const usersLocal = localStorage.getItem('users')
    const currentUserIdLocal = localStorage.getItem('currentUserId')
    const likedFilmaLocal = localStorage.getItem('likedFilms')

    if (usersLocal) {
      dispatch(updateUsers(JSON.parse(usersLocal)))
    }

    if (currentUserIdLocal) {
      dispatch(updateCurrentUserId(JSON.parse(currentUserIdLocal)))
    }

    if (likedFilmaLocal) {
      dispatch(updateLikedFilmsList(JSON.parse(likedFilmaLocal)))
    }
  }, [])

  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route path={navigPaths.login} element={<AuthPage />} />
          <Route
            path={navigPaths.registriation}
            element={<RegistrationPage />}
          />
          <Route path={navigPaths.main} element={<AllFilms />} />
          <Route path={navigPaths.liked} element={<LikedFilms />} />
          <Route path={`${navigPaths.card}/:id`} element={<FilmPage />} />

          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default App
