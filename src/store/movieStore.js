import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMovieStore = create(
  persist(
    (set, get) => ({

      popularMovies: [],
      searchResults: [],
      searchQuery: '',
      isLoading: false,
      error: null,
      favorites: [],
      isAuth: false,
      theme: 'dark', 

      setPopularMovies: (movies) => set({ popularMovies: movies || [] }),
      
      setSearchResults: (results) => set({ searchResults: results || [] }),
      
      setSearchQuery: (query) => set({ searchQuery: query || '' }),
      
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearSearch: () => set({ 
        searchResults: [], 
        searchQuery: '', 
        error: null 
      }),


      addToFavorites: (movie) => {
        const newFavorites = [...(get().favorites || []), movie];
        set({ favorites: newFavorites });
      },

      removeFromFavorites: (movieId) => {
        const newFavorites = (get().favorites || []).filter(m => m.id !== movieId);
        set({ favorites: newFavorites });
      },

      isFavorite: (movieId) => {
        return (get().favorites || []).some(m => m.id === movieId);
      },


      login: () => set({ isAuth: true }),
      logout: () => set({ isAuth: false }),

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
      
      },

    
      initTheme: () => {
        const currentTheme = get().theme;
        document.documentElement.setAttribute('data-theme', currentTheme);
      }
    }),
    {
      name: 'movie-app-storage',
      partialize: (state) => ({ 
        favorites: state.favorites,
        isAuth: state.isAuth,
        theme: state.theme
      }),
    }
  )
);

export default useMovieStore;