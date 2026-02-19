import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useMovieStore from '../../store/movieStore'
import ThemeToggle from '../ui/ThemeToggle'
import { FaBars, FaTimes } from "react-icons/fa"
import './Header.css'

const Header = () => {
  const { isAuth, logout, favorites } = useMovieStore()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    logout()
    setMenuOpen(false) 
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="logo">
          Simple Movies
        </Link>

        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link 
            to="/" 
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>

          <Link 
            to="/favorites" 
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Favoris
            {favorites.length > 0 && (
              <span className="favorites-badge">
                {favorites.length}
              </span>
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
