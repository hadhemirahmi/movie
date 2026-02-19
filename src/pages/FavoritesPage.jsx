import React from 'react'
import { Link } from 'react-router-dom'
import useMovieStore from '../store/movieStore'
import MovieCard from '../components/movies/MovieCard'
import './FavoritesPage.css'

const FavoritesPage = () => {
  const { favorites } = useMovieStore()

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-icon">🎬</div>
        <h2>Aucun favori pour le moment</h2>
        <p>Explorez les films et ajoutez-les à vos favoris</p>
        <Link to="/" className="explore-btn">
          Découvrir des films
        </Link>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Mes films favoris</h1>
        <p className="favorites-count">{favorites.length} film(s)</p>
      </div>
      
      <div className="favorites-grid">
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage