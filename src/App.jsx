import React, { useState } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <MovieList onMovieSelect={handleMovieSelect} />
      </main>
      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}

export default App;