import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFilm
} from "react-icons/fa"
import useMovieStore from '../../store/movieStore'
import './Footer.css'

const Footer = () => {
  const { theme } = useMovieStore()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">

        {/* Section 1 - Logo & Description */}
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <FaFilm className="logo-icon" />
            Simple Movies
          </Link>

          <p className="footer-description">
            Découvrez les meilleurs films populaires,
            leurs bandes-annonces et ajoutez vos favoris
            pour les retrouver plus tard.
          </p>

          <div className="footer-social">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaTwitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Section 2 - Navigation */}
        <div className="footer-section">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Accueil</Link></li>
            <li><Link to="/favorites" className="footer-link">Favoris</Link></li>
            <li><Link to="/login" className="footer-link">Connexion</Link></li>
          </ul>
        </div>

        {/* Section 3 - About */}
        <div className="footer-section">
          <h3 className="footer-title">À propos</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Comment ça marche</a></li>
            <li><a href="#" className="footer-link">FAQ</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>

        {/* Section 4 - Contact */}
        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-contact">

            <li>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:contact@simplemovies.com" className="contact-link">
                contact@simplemovies.com
              </a>
            </li>

            <li>
              <FaPhone className="contact-icon" />
              <a href="tel:+33123456789" className="contact-link">
                +33 1 23 45 67 89
              </a>
            </li>

            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span className="contact-text">Paris, France</span>
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {currentYear} Simple Movies. Tous droits réservés.</p>

        <p className="credits">
          
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="tmdb-credit"
          >
            TMDB API
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
