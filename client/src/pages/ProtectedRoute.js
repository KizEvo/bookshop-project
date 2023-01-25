import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
import useQuery from '../utils/query'

const ProtectedRoute = ({ children, protectRoute }) => {
  const query = useQuery()
  const { user } = useAppContext()

  if ((!user || user.role === 'admin') && protectRoute === 'checkout')
    return <Navigate to='/register' />

  if (protectRoute && !user) {
    const token = query.get('token')
    if (!token) return <Navigate to='/' />

    return children
  }

  return children
}
export default ProtectedRoute
