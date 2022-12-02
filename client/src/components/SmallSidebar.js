import Logo from './Logo'
import NavLinksComponent from './NavLinksComponent'
import { IoCloseSharp } from 'react-icons/io5'
import { linksAdmin } from '../utils/links'
import { useAppContext } from '../context/appContext'
import { NavLink } from 'react-router-dom'

const SmallSidebar = () => {
  const { showAdminSidebar, toggleAdminSidebar } = useAppContext()
  return (
    <div className='small-sidebar'>
      <div
        className={
          showAdminSidebar
            ? 'small-sidebar-container show-small-sidebar'
            : 'close-small-sidebar'
        }
      >
        <div className='small-sidebar-content'>
          <div className='close-btn' onClick={toggleAdminSidebar}>
            <IoCloseSharp />
          </div>
          <div className='header my-4'>
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
            <NavLink to='/' className='btn btn-primary m-3'>
              Return Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SmallSidebar
