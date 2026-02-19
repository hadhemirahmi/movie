import useMovieStore from '../store/movieStore'

export const useAuth = () => {
  const { isAuth, login, logout } = useMovieStore()
  
  return {
    isAuth,
    login: () => {
      login()
      console.log('User logged in')
    },
    logout: () => {
      logout()
      console.log('User logged out')
    }
  }
}