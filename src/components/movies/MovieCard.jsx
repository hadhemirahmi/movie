import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from '../ui/FavoriteButton'
import './MovieCard.css'

const MovieCard = ({ movie }) => {
  if (!movie) return null

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  const year = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A'

  const rating = movie.vote_average 
    ? movie.vote_average.toFixed(1) 
    : 'N/A'

  return (
    <div className="movie-card-wrapper">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card">
          <div className="movie-poster-container">
            <img 
              src={posterUrl} 
              alt={`${movie.title || 'Movie'} poster`}
              className="movie-poster"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x750?text=Image+Not+Found'
              }}
            />
            <div className="movie-rating-badge">
               {rating}
            </div>
          </div>
          
          <div className="movie-info">
            <h3 className="movie-title">
              {movie.title || 'Untitled'}
            </h3>
            <p className="movie-year">{year}</p>
          </div>
        </div>
      </Link>
      
      <div className="favorite-overlay">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  )
}

export default MovieCard