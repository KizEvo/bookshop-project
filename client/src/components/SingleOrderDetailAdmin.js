import React from 'react'
import ProductDetailInOrder from './ProductDetailInOrder'

const SingleOrderDetailAdmin = (props) => {
  const statusOption = props.status === 'delivering' ? 'arrived' : 'delivering'

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
          <select className='p-2 border border-primary rounded-pill'>
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
      <div className='d-flex flex-column gap-4 d-md-inline-block justify-content-center text-center mt-3'>
        <button className='btn btn-light px-5 flex-fill mx-2 border border-danger border-3'>
          DELETE ORDER
        </button>
        <button className='btn btn-light px-5 flex-fill mx-2 border border-success border-3'>
          UPDATE ORDER
        </button>
      </div>
    </div>
  )
}
export default SingleOrderDetailAdmin
