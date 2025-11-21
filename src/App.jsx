import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import MainPage from './pages/main-page/main-page.jsx'
import Auth from './pages/auth/auth.jsx'
import FilmPage from './pages/film-page/film-page.jsx'
import ProfilePage from './pages/profile-page/profile-page.jsx'
import WelcomePage from './pages/welcome-page/welcome-page.jsx'
import Header from './common-ui/header/header.jsx'

function App() {
    const location = useLocation()

    const hideHeaderPaths = ['/auth', '/']
    const shouldShowHeader = !hideHeaderPaths.includes(location.pathname)
    return (
        <>
            {shouldShowHeader && <Header />}

            <Routes>
                <Route path='/' element={<WelcomePage />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/film/:id' element={<FilmPage />} />
                <Route path='/profile' element={<ProfilePage />} />
            </Routes>
        </>
    )
}

export default App
