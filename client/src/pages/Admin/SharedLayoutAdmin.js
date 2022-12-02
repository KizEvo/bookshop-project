import { Outlet } from 'react-router-dom'
import {
  BigSidebar,
  SmallSidebar,
  AdminNavbarComponent,
} from '../../components'

const SharedLayoutAdmin = () => {
  return (
    <>
      <section className='dashboard'>
        <BigSidebar />
        <SmallSidebar />
        <div>
          <AdminNavbarComponent/>
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  )
}
export default SharedLayoutAdmin
