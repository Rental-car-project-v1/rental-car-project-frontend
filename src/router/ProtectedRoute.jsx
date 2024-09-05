import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  if (!isAuthenticated) {
    toast.error('Please login before accessing')
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
