import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
import useQuery from '../utils/query'

const ProtectedRoute = ({ children, protectRoute }) => {
  const query = useQuery()
  const { user } = useAppContext()
  if (protectRoute && !user) {
    const token = query.get('token')
    if (!token) {
      return <Navigate to='/' />
    }
    return children
  }

  if (!user || user.role === 'admin') {
    return <Navigate to='/register' />
  }
  return children
}
export default ProtectedRoute
