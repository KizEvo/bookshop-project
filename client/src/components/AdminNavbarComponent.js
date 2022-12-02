import { useState } from 'react'
import { FaAlignLeft } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'

const AdminNavBarComponent = () => {
  const { user, toggleAdminSidebar, logoutUser} = useAppContext()
  const [loading, setLoading] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    logoutUser()
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  }

  return (
    <div className='d-flex p-4 bg-primary'>
      <FaAlignLeft className='icon text-success' onClick={toggleAdminSidebar} />
      <h4 className='text-light ms-auto p-1 my-0'>Dashboard</h4>
      <div className='ms-auto'>
        <div>
          <span className='mx-2 text-light p-1'>Hello, {user.name}</span>
          <button className='btn btn-success' onClick={handleClick} disabled={loading}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default AdminNavBarComponent
