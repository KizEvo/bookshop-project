import React, { useRef, useState } from 'react'
import { useAppContext } from '../context/appContext'
import ProductDetailInOrder from './ProductDetailInOrder'

const SingleOrderDetailAdmin = (props) => {
  const { updateOrder, deleteOrder } = useAppContext()

  const [confirmDeleteOrder, setConfirmDeleteOrder] = useState(false)
  const [isSameStatus, setIsSameStatus] = useState(false)
  const selectedStatusOptionRef = useRef()

  const statusOption = props.status === 'delivering' ? 'arrived' : 'delivering'

  const updateOrderStatusHandler = () => {
    if (props.status === selectedStatusOptionRef.current.value) {
      setIsSameStatus(true)
      setTimeout(() => {
        setIsSameStatus(false)
      }, 3000)
      return
    }
    updateOrder(props._id, selectedStatusOptionRef.current.value)
  }

  const deleteOrderHandler = () => {
    if (confirmDeleteOrder === false) {
      setConfirmDeleteOrder(true)
      return
    }
    setConfirmDeleteOrder(false)
    deleteOrder(props._id)
  }

  const confirmDeleteOrderMsg = confirmDeleteOrder && (
    <p
      className='mt-2 p-2 h6 align-self-center text-danger border border-danger'
      style={{ width: 'fit-content' }}
    >
      Click the DELETE button again if you wish to continue
    </p>
  )

  const alertWhenSameOrderStatus = isSameStatus && (
    <p
      className='mt-2 p-2 h6 align-self-center text-danger border border-danger'
      style={{ width: 'fit-content' }}
    >
      Please provide new value for status field
    </p>
  )

  return (
    <div className='d-flex flex-column border rounded p-3 px-4 gap-3'>
      <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center'>
        <p>
          <span className='h5'>ID: </span>
          {props._id}
        </p>
        <p className='h5 border rounded bg-primary p-2 text-light text-center'>
          ${props.totalPrice}
        </p>
      </div>
      <div className='mb-3'>
        <span className='h5'>Customer info: </span>
        <span>
          {props.customerInfo.name}, shipping location is{' '}
          {props.customerInfo.shippingLocation}
        </span>
      </div>
      <div className='d-flex flex-column flex-md-row gap-4'>
        <div className='d-flex flex-column gap-3 mb-3'>
          <div className='h5'>Status</div>
          <select
            ref={selectedStatusOptionRef}
            className='p-2 border border-primary rounded-pill'
          >
            <option value={props.status}>{props.status}</option>
            <option value={statusOption}>{statusOption}</option>
          </select>
        </div>
      </div>
      <div>
        <h5>Products</h5>
        <div className='d-flex flex-wrap gap-3'>
          {props.orderProducts.map((product) => {
            return (
              <React.Fragment key={product._id}>
                <ProductDetailInOrder {...product} />
              </React.Fragment>
            )
          })}
        </div>
      </div>
      {confirmDeleteOrderMsg}
      {alertWhenSameOrderStatus}
      <div className='d-flex flex-column gap-4 d-md-inline-block justify-content-center text-center mt-3'>
        <button
          className='btn btn-light px-5 flex-fill mx-2 border border-danger border-3'
          onClick={deleteOrderHandler}
        >
          DELETE ORDER
        </button>
        <button
          className='btn btn-light px-5 flex-fill mx-2 border border-success border-3'
          onClick={updateOrderStatusHandler}
        >
          UPDATE ORDER
        </button>
      </div>
    </div>
  )
}
export default SingleOrderDetailAdmin
