import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const ProductUser = ({ _id, name, price, author, image }) => {
  const { setProductId, addProductToCartWithoutGoingIntoItsDetailPage } =
    useAppContext()

  const imgClickHandler = () => {
    setProductId(_id)
  }

  const addToCartClickHandler = () => {
    setProductId(_id)
    addProductToCartWithoutGoingIntoItsDetailPage()
  }

  return (
    <>
      <div
        className='d-flex flex-column justify-content-between border border-1 rounded-2'
        style={{ width: '12rem' }}
      >
        <Link to={`${_id}`}>
          <img
            src={image}
            className='card-img-top hover-cursor-pointer rounded-top'
            alt={`${name}`}
            onClick={imgClickHandler}
          />
        </Link>
        <div className='m-2 mt-auto'>
          <p className='card-text-info fw-bold mt-2'>{name}</p>
          <p className='card-text-info'>Author: {author}</p>
          <p className='fw-bold fs-6 p-0 mb-0 mt-2'>{price}$</p>
        </div>
        <Link
          to='../cart'
          className='btn btn-primary'
          onClick={addToCartClickHandler}
        >
          Add to cart
        </Link>
      </div>
    </>
  )
}
export default ProductUser
