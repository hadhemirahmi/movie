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


export const searchMovies = async (query) => {
  if (!query || query.trim() === '') {
    return [];
  }

  try {
    console.log(`Searching for: "${query}"...`);
    
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
    );
    
    console.log('Search response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Found ${data.results?.length || 0} movies for "${query}"`);
    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error.message);
    return [];
  }
};

export const fetchMovieById = async (movieId) => {
  try {
    console.log(`Fetching movie details for ID: ${movieId}...`);
    
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    );
    
    console.log('Movie details response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Movie details fetched successfully:', data.title);
    
  
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      data.trailer_key = trailer ? trailer.key : null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    return null;
  }
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    console.log(`Fetching trailer for movie ID: ${movieId}...`);
    
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    
    console.log('Trailer response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const trailer = data.results?.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    
    console.log('Trailer found:', trailer ? 'Yes' : 'No');
    return trailer?.key || null;
  } catch (error) {
    console.error('Error fetching trailer:', error.message);
    return null;
  }
};