import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const SingleFeaturedProduct = (props) => {
  const navigate = useNavigate()

  const iconNavigateHandler = () => {
    navigate(`/products/${props.id}`)
  }

  return (
    <>
      <div className='img-overlay' id={`featured-products-${props.name}`}>
        <FiSearch
          className='hover-cursor-pointer'
          onClick={iconNavigateHandler}
        />
        <img
          src={props.image}
          alt='featured products'
          className='card-img-top rounded'
        />
      </div>
      <label
        htmlFor={`featured-products-${props.name}`}
        className='d-flex flex-column mt-3'
      >
        <p className='mb-0'>{props.name}</p>
        <p className='text-success fw-bold'>${props.price}</p>
      </label>
    </>
  )
}
export default SingleFeaturedProduct
