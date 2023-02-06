import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import PaginationBtnOrders from './PaginationBtnOrders'
import SingleOrderDetailAdmin from './SingleOrderDetailAdmin'

const AllOrdersContainerAdmin = () => {
  const {
    getAllOrdersAdmin,
    adminAllOrders,
    isLoading,
    numberOfPagesOrders,
    updatedOrderFlag,
    deletedOrderFlag,
  } = useAppContext()

  useEffect(() => {
    const abortController = new AbortController()

    getAllOrdersAdmin(abortController)
    return () => {
      abortController.abort()
    }
  }, [getAllOrdersAdmin, updatedOrderFlag, deletedOrderFlag])

  if (isLoading) {
    return <Loading pageLoading={isLoading} />
  }

  return (
    <div className='container d-flex flex-column justify-content-center gap-5 mt-5'>
      {adminAllOrders.map((order) => {
        return (
          <div key={order._id} className='shadow'>
            <SingleOrderDetailAdmin {...order} />
          </div>
        )
      })}
      {numberOfPagesOrders > 1 && <PaginationBtnOrders />}
    </div>
  )
}
export default AllOrdersContainerAdmin
