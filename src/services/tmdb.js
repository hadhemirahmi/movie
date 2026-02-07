
const API_KEY = '20108f1c4ed38f7457c479849a9999cc';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
  try {
    console.log('Fetching movies from TMDB...');
    
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Movies fetched successfully:', data.results?.length || 0, 'movies');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    return [];
  }
};