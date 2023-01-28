import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
import useQuery from '../utils/query'

const ProtectedRoute = ({ children, protectRoute }) => {
  const query = useQuery()
  const { user, productsInCart, userIsNotLoggedIn } = useAppContext()

  if (user?.role) {
    const isProtectedRouteResetVerifyPassword =
      protectRoute === 'reset-password' || protectRoute === 'verify-email'
    if (isProtectedRouteResetVerifyPassword) return <Navigate to='/' />
  }

  if (!user && protectRoute === 'checkout') {
    userIsNotLoggedIn()
    return <Navigate to='/register' />
  }

  if (user && protectRoute === 'checkout' && productsInCart.length === 0)
    return <Navigate to='/products' />

  if (protectRoute && !user) {
    const token = query.get('token')
    if (!token) return <Navigate to='/' />

    return children
  }

  return children
}
export default ProtectedRoute
