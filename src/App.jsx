import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer' 
import LoadingSpinner from './components/common/LoadingSpinner'
import PrivateRoute from './components/PrivateRoute'
import useMovieStore from './store/movieStore'
import './App.css'


const HomePage = lazy(() => import('./pages/HomePage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

function App() {
  const { theme, initTheme } = useMovieStore()

  useEffect(() => {
    initTheme()
  }, [initTheme])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Router>
      <div className="App">
        <Header />
        <Suspense fallback={<LoadingSpinner message="Chargement de la page..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/favorites" 
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Suspense>
        <Footer /> 
      </div>
    </Router>
  )
}

export default App