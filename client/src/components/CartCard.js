const CartCard = (props) => {
  return (
    <div className='card mb-4'>
      <div className='card-body p-4'>
        <div className='row align-items-center justify-content-between'>
          <div className='col-md-2' style={{ width: '8rem' }}>
            <img
              src={props.image}
              className='img-fluid img-thumbnail'
              alt={props}
            />
          </div>

          <div className='col-md-2 d-flex justify-content-center flex-fill'>
            <div style={{ width: '20rem' }}>
              <p className='small text-muted mb-4 pb-2'>Name</p>
              <p className='lead fw-normal mb-0'>{props.name}</p>
            </div>
          </div>

          <div className='col-md-2 d-flex justify-content-center'>
            <div>
              <p className='small text-muted mb-4 pb-2'>Quantity</p>
              <p className='lead fw-normal mb-0'>{props.quantity}</p>
            </div>
          </div>

          <div className='col-md-2 d-flex justify-content-center'>
            <div>
              <p className='small text-muted mb-4 pb-2'>Price</p>
              <p className='lead fw-normal mb-0'>${props.price}</p>
            </div>
          </div>

          <div className='col-md-2 d-flex justify-content-center'>
            <div>
              <p className='small text-muted mb-4 pb-2'>Total</p>
              <p className='lead fw-normal mb-0'>
                ${props.price * props.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartCard
