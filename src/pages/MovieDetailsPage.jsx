import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieById } from '../services/tmdb';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovieById(id);
        if (movieData) {
          setMovie(movieData);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="details-error">
        <h2>{error || 'Movie not found'}</h2>
        <Link to="/" className="back-button">
          Back to Home
        </Link>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Backdrop';

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <div className="movie-details-page">
      <div 
        className="movie-backdrop" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="details-container">
        <Link to="/" className="back-button">
          ← Back to Movies
        </Link>

        <div className="movie-details-content">
          <div className="movie-poster-section">
            <img 
              src={posterUrl} 
              alt={movie.title}
              className="details-poster"
            />
          </div>

          <div className="movie-info-section">
            <h1 className="movie-title">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-meta">
              <span className="meta-item"> {year}</span>
              <span className="meta-item"> {movie.runtime || 'N/A'} min</span>
              <span className="meta-item rating">
                ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}/10
              </span>
              <span className="meta-item votes">
                 {movie.vote_count?.toLocaleString() || 0} votes
              </span>
            </div>

           
            {movie.genres && Array.isArray(movie.genres) && movie.genres.length > 0 && (
              <div className="movie-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name} 
                  </span>
                ))}
              </div>
            )}

            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview || 'No overview available.'}</p>
            </div>

            <button 
              className="trailer-button"
              onClick={() => setShowTrailer(!showTrailer)}
            >
              {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
            </button>

            {showTrailer && movie.trailer_key && (
              <div className="trailer-container">
                <iframe
                  className="trailer-iframe"
                  src={`https://www.youtube.com/embed/${movie.trailer_key}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;