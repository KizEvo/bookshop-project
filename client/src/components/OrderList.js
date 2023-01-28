import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import SingleOrder from './SingleOrder'
import Alert from './Alert'
import Loading from './Loading'

const OrderList = () => {
  const { getPersonalUserOrders, userPersonalOrders, showAlert, isLoading } =
    useAppContext()

  useEffect(() => {
    const abortController = new AbortController()
    getPersonalUserOrders(abortController)
    return () => {
      abortController.abort()
    }
  }, [getPersonalUserOrders])

  const ordersExistAfterFetched = userPersonalOrders.length !== 0 && !isLoading
  const noExistingOrdersAfterFetched = userPersonalOrders.length === 0

  return (
    <div className='d-flex flex-column'>
      <h4>Your order(s) status</h4>
      {showAlert && <Alert />}
      {noExistingOrdersAfterFetched && (
        <h5 className='m-5'>No existing order at the moment!</h5>
      )}
      {isLoading && <Loading pageLoading={isLoading} />}
      {ordersExistAfterFetched &&
        userPersonalOrders.map((order) => {
          return (
            <React.Fragment key={order._id}>
              <SingleOrder {...order} />
            </React.Fragment>
          )
        })}
    </div>
  )
}
export default OrderList
