import { useAppContext } from '../context/appContext'
import { GrClose } from 'react-icons/gr'

const CartCard = (props) => {
  const { deleteProductInCart } = useAppContext()

  const deleteProductHandler = () => {
    deleteProductInCart(props.id)
  }

  return (
    <div className='card mb-4'>
      <div className='card-body p-4'>
        <div className='row align-items-center justify-content-between'>
          <div className='col-md-2 d-flex justify-content-center'>
            <img
              src={props.image}
              className='img-thumbnail'
              alt={props}
              style={{ width: '8rem' }}
            />
          </div>

          <div className='col-md-2 d-flex justify-content-center flex-fill'>
            <div
              style={{ width: '20rem' }}
              className='d-flex flex-column align-items-center'
            >
              <p className='small text-muted mb-4 pb-2'>Name</p>
              <p className='lead fw-normal mb-0'>{props.name}</p>
            </div>
          </div>

          <div className='col-md-2 d-flex justify-content-center'>
            <div className='d-flex flex-column align-items-center'>
              <p className='small text-muted mb-4 pb-2'>Quantity</p>
              <p className='lead fw-normal mb-0'>{props.quantity}</p>
            </div>
          </div>

          <div className='col-md-2 d-flex justify-content-center'>
            <div className='d-flex flex-column align-items-center'>
              <p className='small text-muted mb-4 pb-2'>Price</p>
              <p className='lead fw-normal mb-0'>${props.price}</p>
            </div>
          </div>

          <div className='col-md-2 d-flex justify-content-center'>
            <div className='d-flex flex-column align-items-center'>
              <p className='small text-muted mb-4 pb-2'>Total</p>
              <p className='lead fw-normal mb-0'>
                ${props.price * props.quantity}
              </p>
            </div>
          </div>

          <div className='col-md-2' style={{ width: 'fit-content' }}>
            <div
              className='p-2 cart-card-delete-icon hover-cursor-pointer'
              onClick={deleteProductHandler}
            >
              <GrClose />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartCard
