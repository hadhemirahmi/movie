import React from 'react'
import useMovieStore from '../../store/movieStore'
import './FavoriteButton.css'

const FavoriteButton = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieStore()
  const isFav = isFavorite(movie.id)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isFav) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return (
    <button 
      className={`favorite-btn ${isFav ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <span className="heart-icon">{isFav ? '❤️' : '🤍'}</span>
      <span className="favorite-text">
        {isFav ? 'Retirer' : 'Ajouter'}
      </span>
    </button>
  )
}

export default FavoriteButton