import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useMovieStore from '../../store/movieStore'
import ThemeToggle from '../ui/ThemeToggle'
import './Header.css'

const Header = () => {
  const { isAuth, logout, favorites } = useMovieStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Simple Movies
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/favorites" className="nav-link">
            Favoris
            {favorites.length > 0 && (
              <span className="favorites-badge">{favorites.length}</span>
            )}
          </Link>
        </nav>
        
        <div className="header-actions">
          <ThemeToggle />
          
          {isAuth ? (
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="login-link">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header