import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const ProductUser = ({ _id, name, price, author, image }) => {
  const { setProductId, productId } = useAppContext()

  const clickHandler = () => {
    setProductId(_id)
  }

  return (
    <>
      <div
        className='d-flex flex-column justify-content-between border border-1 rounded-2'
        style={{ width: '12rem' }}
      >
        <Link to={`${productId}`}>
          <img
            src={image}
            className='card-img-top hover-cursor-pointer rounded-top'
            alt={`${name}`}
            onClick={clickHandler}
          />
        </Link>
        <div className='m-2 mt-auto' onClick={clickHandler}>
          <p className='card-text-info fw-bold mt-2'>{name}</p>
          <p className='card-text-info'>Author: {author}</p>
          <p className='fw-bold fs-6 p-0 mb-0 mt-2'>{price}$</p>
        </div>
        <button className='btn btn-primary'>Add to cart</button>
      </div>
    </>
  )
}
export default ProductUser
