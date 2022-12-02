import { linksAdmin } from '../utils/links'
import NavLinksComponent from './NavLinksComponent'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'
import { NavLink } from 'react-router-dom'
const BigSidebar = () => {
  const { showAdminSidebar } = useAppContext()
  return (
    <div className='big-sidebar'>
      <div
        className={
          showAdminSidebar
            ? 'sidebar-container show-sidebar d-flex flex-column'
            : 'sidebar-container'
        }
      >
        <div className='header'>
          <Logo />
        </div>
        <div className='d-flex flex-column m-2'>
          {linksAdmin.map((linkAdmin) => {
            return (
              <div key={linkAdmin.id} className='nav-link-admin'>
                <NavLinksComponent {...linkAdmin}></NavLinksComponent>
              </div>
            )
          })}
        </div>
        <NavLink to='/' className='btn btn-primary m-3 mt-auto'>Return Home</NavLink>
      </div>
    </div>
  )
}
export default BigSidebar
