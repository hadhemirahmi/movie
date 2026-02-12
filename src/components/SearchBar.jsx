import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMovieStore from '../store/movieStore';
import { searchMovies } from '../services/tmdb';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { setSearchResults, setIsLoading, setError } = useMovieStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
      navigate('/');
      
      if (results.length === 0) {
        setError(`No movies found for "${query}"`);
      } else {
        setError(null);
      }
    } catch (error) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;