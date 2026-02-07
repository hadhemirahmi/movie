import React from 'react';
import './MovieDetails.css';

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : 'https://via.placeholder.com/500x281?text=No+Image';

  return (
    <div className="movie-details-overlay" onClick={onClose}>
      <div className="movie-details-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="movie-details-header">
          <img 
            src={backdropUrl} 
            alt={`${movie.title} backdrop`}
            className="movie-backdrop"
          />
        </div>
        
        <div className="movie-details-body">
          <h2>{movie.title}</h2>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-meta">
            <span className="movie-rating">
               {movie.vote_average?.toFixed(1)}/10
            </span>
            <span className="movie-release">
               {new Date(movie.release_date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;