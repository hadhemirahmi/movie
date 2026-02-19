import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchMovieById } from '../services/tmdb'
import FavoriteButton from '../components/ui/FavoriteButton'
import useMovieStore from '../store/movieStore'
import './MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  
  // Récupérer le thème pour l'overlay
  const { theme } = useMovieStore()

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const movieData = await fetchMovieById(id)
        if (movieData) {
          setMovie(movieData)
        } else {
          setError('Movie not found')
        }
      } catch (err) {
        console.error('Error fetching movie details:', err)
        setError('Failed to load movie details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getMovieDetails()
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="details-error">
        <h2>⚠️ {error || 'Movie not found'}</h2>
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    )
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Backdrop'

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  // Fonction pour gérer l'erreur de chargement d'image
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/500x750?text=Image+Not+Found'
  }

  return (
    <div className="movie-details-page">
      {/* Backdrop avec overlay */}
      <div 
        className="movie-backdrop" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {/* Overlay adapté au thème */}
        <div className={`backdrop-overlay ${theme === 'light' ? 'dark-overlay' : ''}`}></div>
      </div>

      <div className="details-container">
        <Link to="/" className="back-button">
          ← Back to Movies
        </Link>

        <div className="movie-details-content">
          {/* Section poster */}
          <div className="movie-poster-section">
            <img 
              src={posterUrl} 
              alt={`${movie.title} poster`}
              className="details-poster"
              onError={handleImageError}
              loading="lazy"
            />
          </div>

          {/* Section informations */}
          <div className="movie-info-section">
            {/* Header avec titre et bouton favori */}
            <div className="movie-header">
              <h1 className="movie-title">{movie.title}</h1>
              <FavoriteButton movie={movie} />
            </div>
            
            {/* Tagline */}
            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}

            {/* Métadonnées */}
            <div className="movie-meta">
              <span className="meta-item" title="Release date">
                <span className="meta-icon">📅</span>
                <span className="meta-text">{year}</span>
              </span>
              
              <span className="meta-item" title="Runtime">
                <span className="meta-icon">⏱️</span>
                <span className="meta-text">{movie.runtime || 'N/A'} min</span>
              </span>
              
              <span className="meta-item rating" title="TMDB Rating">
                <span className="meta-icon">⭐</span>
                <span className="meta-text">{movie.vote_average?.toFixed(1) || 'N/A'}/10</span>
              </span>
              
              <span className="meta-item votes" title="Number of votes">
                <span className="meta-icon">🎬</span>
                <span className="meta-text">{movie.vote_count?.toLocaleString() || 0} votes</span>
              </span>
            </div>

            {/* Genres */}
            {movie.genres && Array.isArray(movie.genres) && movie.genres.length > 0 && (
              <div className="movie-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag" title={genre.name}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <div className="movie-overview">
              <h3>Synopsis</h3>
              <p>{movie.overview || 'No overview available.'}</p>
            </div>

            {/* Informations supplémentaires (optionnelles) */}
            {(movie.production_countries?.length > 0 || movie.production_companies?.length > 0) && (
              <div className="movie-additional-info">
                {movie.production_countries?.length > 0 && (
                  <div className="info-item">
                    <strong>Country:</strong> {movie.production_countries.map(c => c.name).join(', ')}
                  </div>
                )}
                
                {movie.production_companies?.length > 0 && (
                  <div className="info-item">
                    <strong>Production:</strong> {movie.production_companies.slice(0, 3).map(c => c.name).join(', ')}
                    {movie.production_companies.length > 3 && '...'}
                  </div>
                )}
              </div>
            )}

            {/* Bouton trailer */}
            {movie.trailer_key && (
              <button 
                className="trailer-button"
                onClick={() => setShowTrailer(!showTrailer)}
                aria-expanded={showTrailer}
              >
                <span className="trailer-icon">{showTrailer ? '🎬' : '▶️'}</span>
                <span className="trailer-text">
                  {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
                </span>
              </button>
            )}

            {/* Trailer iframe */}
            {showTrailer && movie.trailer_key && (
              <div className="trailer-container">
                <iframe
                  className="trailer-iframe"
                  src={`https://www.youtube.com/embed/${movie.trailer_key}?autoplay=1&rel=0`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails