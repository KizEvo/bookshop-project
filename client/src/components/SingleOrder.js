import ProgressBar from 'react-bootstrap/ProgressBar'

const SingleOrder = (props) => {
  const now = props.status === 'arrived' ? 100 : 50

  return (
    <div className='m-3 p-3 border rounded shadow '>
      <div className='d-flex align-items-start gap-md-5 flex-column flex-md-row justify-content-md-between'>
        <p>
          <span className='h5'>Created:</span>{' '}
          {props.createdAt.substring(0, 10)}
        </p>
        <p>
          <span className='h5'>Status:</span> {props.status}
        </p>
        <p className='h5'>${props.totalPrice}</p>
      </div>
      <div className='d-flex justify-content-start mt-1'>
        <p>
          <span className='h5'>Products: </span>
          {props.orderProducts.map((product) => {
            return <span key={product._id}>{product.name}, </span>
          })}
        </p>
      </div>
      <ProgressBar now={now} />
    </div>
  )
}
export default SingleOrder
