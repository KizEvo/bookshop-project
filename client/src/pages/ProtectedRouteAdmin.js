import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'

const ProtectedRouteAdmin = ({ children }) => {
  const { user } = useAppContext()
  if (user) {
    if (user.role !== 'admin') {
      return <Navigate to='/' />
    }
    return children
  }
  if (!user) {
    return <Navigate to='/' />
  }
  return children
}
export default ProtectedRouteAdmin
