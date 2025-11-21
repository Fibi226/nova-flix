import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import MainPage from './pages/main-page/main-page.jsx'
import Auth from './pages/auth/auth.jsx'
import FilmPage from './pages/film-page/film-page.jsx'
import ProfilePage from './pages/profile-page/profile-page.jsx'
import WelcomePage from './pages/welcome-page/welcome-page.jsx'
import Header from './common-ui/header/header.jsx'
import { ROUTES } from './constants/routes.js'

function App() {
    const location = useLocation()

    const hideHeaderPaths = [ROUTES.AUTH, ROUTES.WELCOME]
    const shouldShowHeader = !hideHeaderPaths.includes(location.pathname)
    
    return (
        <>
            {shouldShowHeader && <Header />}

            <Routes>
                <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
                <Route path={ROUTES.MAIN} element={<MainPage />} />
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path={ROUTES.FILM} element={<FilmPage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Routes>
        </>
    )
}

export default App
