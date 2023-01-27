import { useAppContext } from '../context/appContext'
import { useState } from 'react'
import { UpdateUser, OrderList } from '../components'

const User = () => {
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState(true)
  const [orders, setOrders] = useState(false)

  const { logoutUser } = useAppContext()

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(!loading)
    logoutUser()
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  }

  return (
    <section className='full-screen'>
      <div className='user-background-img'></div>
      <div className='container'>
        <div className='d-lg-flex text-center justify-content-between gap-5 mt-5'>
          <div className='d-flex justify-content-center'>
            <div className='d-flex flex-lg-column user-info-container-bar'>
              <button
                className='user-info-bar btn'
                onClick={() => {
                  setAddress(true)
                  setOrders(false)
                }}
              >
                Address
              </button>
              <button
                className='user-info-bar btn'
                onClick={() => {
                  setAddress(false)
                  setOrders(true)
                }}
              >
                Orders
              </button>
              <button
                className='user-info-bar btn'
                disabled={loading}
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          </div>
          <div className='form-bigger form-background flex-fill'>
            {address && <UpdateUser />}
            {orders && <OrderList />}
          </div>
        </div>
      </div>
    </section>
  )
}
export default User
