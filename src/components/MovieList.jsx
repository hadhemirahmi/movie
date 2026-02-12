import React, { useEffect } from 'react';
import { fetchPopularMovies } from '../services/tmdb';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import useMovieStore from '../store/movieStore';
import './MovieList.css';

const MovieList = () => {
  const { 
    popularMovies, 
    searchResults, 
    searchQuery,
    isLoading, 
    error,
    setPopularMovies,
    setIsLoading,
    setError
  } = useMovieStore();

  useEffect(() => {
    const getPopularMovies = async () => {
      setIsLoading(true);
      try {
        const movies = await fetchPopularMovies();
        setPopularMovies(movies);
      } catch (err) {
        setError('Failed to load popular movies');
      } finally {
        setIsLoading(false);
      }
    };

    getPopularMovies();
  }, [setPopularMovies, setIsLoading, setError]);

  const displayMovies = searchResults.length > 0 ? searchResults : popularMovies;
  const title = searchResults.length > 0 
    ? `Search Results (${searchResults.length})` 
    : 'Popular Movies';

  if (isLoading && displayMovies.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <SearchBar />
      
      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}
      
      <div className="movie-list-header">
        <h2>{title}</h2>
        {searchResults.length > 0 && (
          <button 
            className="clear-search-btn"
            onClick={() => useMovieStore.getState().clearSearch()}
          >
            Clear Search
          </button>
        )}
      </div>
      
      {displayMovies.length === 0 ? (
        <div className="no-results">
          <p>No movies found</p>
          {searchQuery && <p>Try searching for something else</p>}
        </div>
      ) : (
        <div className="movie-grid">
          {displayMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;