import { Link } from 'react-router-dom'
import { CartCardContainer } from '../components'
import { useAppContext } from '../context/appContext'

const Cart = () => {
  const { productsInCart, totalPriceOfProductsInCart } = useAppContext()

  const checkCartLengthWhenThereAreProducts = () => {
    if (productsInCart.length > 1) return 'd-flex flex-column'
    return 'd-flex flex-column h-75 justify-content-center'
  }

  if (productsInCart.length === 0) {
    return (
      <section className='container'>
        <p className='mt-5 h2'>Shopping Cart</p>
        <div className='full-screen d-flex flex-column justify-content-center '>
          <div className='h3'>Your cart is empty!</div>
          <div className='card mb-5'>
            <div className='card-body p-4'>
              <div>
                <p className='mb-0 me-5 d-flex justify-content-between align-items-center'>
                  <span className='me-2 h4 mb-0'>Order total</span>
                  <span className='h4 mb-0'>${totalPriceOfProductsInCart}</span>
                </p>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-end mb-3'>
            <Link to='../products' className='btn btn-light btn-lg me-2'>
              Continue shopping
            </Link>
            <button
              type='button'
              disabled
              className='btn btn-primary btn-lg d-flex align-items-center'
            >
              Checkout
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='container'>
      <p className='mt-5'>
        <span className='h2'>Shopping Cart </span>
        <span className='h4'>
          ({productsInCart.length} products in your cart)
        </span>
      </p>

      <div className={checkCartLengthWhenThereAreProducts()}>
        <CartCardContainer />

        {/* total price */}
        <div className='card mb-5 align-self-end' style={{ width: '25rem' }}>
          <div className='card-body p-4'>
            <div>
              <p className='mb-0 me-3 d-flex justify-content-between align-items-center'>
                <span className='me-2 h4 mb-0'>Order total</span>{' '}
                <span className='h4 mb-0'>${totalPriceOfProductsInCart}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-end mb-5'>
          <Link to='/products' className='btn btn-light btn-lg me-2'>
            Continue shopping
          </Link>
          <Link
            to='checkout'
            className='btn btn-primary btn-lg d-flex align-items-center'
          >
            Checkout
          </Link>
        </div>
      </div>
    </section>
  )
}
export default Cart
