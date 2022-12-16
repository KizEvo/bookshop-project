import { Outlet } from 'react-router-dom'
import { NavbarComponent, Footer } from '../components'

const SharedLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </>
  )
}
export default SharedLayout
