import { Navigate } from 'react-router-dom'
import useMovieStore from '../store/movieStore'

const PrivateRoute = ({ children }) => {
  const { isAuth } = useMovieStore()
  
  return isAuth ? children : <Navigate to="/login" replace />
}

export default PrivateRoute