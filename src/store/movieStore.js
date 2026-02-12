import { create } from 'zustand';

const useMovieStore = create((set) => ({

  searchResults: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  selectedMovie: null,
  popularMovies: [],
  setSearchResults: (results) => set({ searchResults: results }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  setPopularMovies: (movies) => set({ popularMovies: movies }),

  clearSearch: () => set({ 
    searchResults: [], 
    searchQuery: '', 
    error: null 
  }),
}));

export default useMovieStore;